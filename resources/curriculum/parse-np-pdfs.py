#!/usr/bin/env python3
"""
Parse NP (Nationella Prov) PDFs and save structured questions to database.
Downloads PDFs from arkiv.edusci.umu.se and extracts questions with metadata.
"""
import re, os, sys, json
from pathlib import Path

DATA_DIR = Path(__file__).parent / 'np-pdfs'
os.makedirs(DATA_DIR, exist_ok=True)

# NP PDFs for math 2-4 from Umeå university
NP_PDFS = [
    # (url, course, year, term)
    # Matematik 2a
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2a-vt22.pdf', 'matematik-2', '2022', 'vt'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2a-vt17.pdf', 'matematik-2', '2017', 'vt'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2a-ht16.pdf', 'matematik-2', '2016', 'ht'),
    # Matematik 2b
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2b-vt22.pdf', 'matematik-2', '2022', 'vt'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2b-vt17.pdf', 'matematik-2', '2017', 'vt'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2b-ht16.pdf', 'matematik-2', '2016', 'ht'),
    # Matematik 2c
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2c-vt22.pdf', 'matematik-2', '2022', 'vt'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2c-vt17.pdf', 'matematik-2', '2017', 'vt'),
    # Matematik 3b
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma3b-vt22.pdf', 'matematik-3', '2022', 'vt'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma3b-vt17.pdf', 'matematik-3', '2017', 'vt'),
    # Matematik 3c
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma3c-vt22.pdf', 'matematik-3', '2022', 'vt'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma3c-vt17.pdf', 'matematik-3', '2017', 'vt'),
]

def download_pdf(url, path):
    if path.exists():
        print(f'  (cached {path.name})')
        return True
    print(f'  Downloading {path.name}...', end=' ', flush=True)
    import urllib.request
    try:
        urllib.request.urlretrieve(url, path)
        print('OK')
        return True
    except Exception as e:
        print(f'FAILED: {e}')
        return False

def parse_np_pdf(pdf_path, course, year, term):
    """Extract questions from NP PDF using pdftotext."""
    import subprocess
    result = subprocess.run(['pdftotext', str(pdf_path), '-'], capture_output=True, text=True)
    if result.returncode != 0:
        print(f'  pdftotext failed: {result.stderr}')
        return []
    
    text = result.stdout
    questions = []
    
    # Split by question numbers - lines that start with a number at the beginning
    # Pattern: leading number followed by a period or space
    question_blocks = re.split(r'\n(?=\d+\s*\n)', text)
    
    for block in question_blocks:
        # Extract question number and content
        m = re.match(r'^(\d+)\s*\n(.*?)(?=\n\d+\s*\n|\Z)', block, re.DOTALL)
        if not m:
            continue
        q_num = int(m.group(1))
        content = m.group(2).strip()
        
        # Extract points from (E/C/A) pattern like (1/0/0), (0/1/1), etc.
        pts_match = re.search(r'\((\d+)/(\d+)/(\d+)\)', content)
        if not pts_match:
            continue
        
        e_pts, c_pts, a_pts = int(pts_match.group(1)), int(pts_match.group(2)), int(pts_match.group(3))
        
        # Clean up content - remove answer lines and excessive whitespace
        # Remove "_____________________" answer blanks
        content = re.sub(r'_+\s*', '', content)
        # Remove the (E/C/A) points annotation
        content = re.sub(r'\(\d+/\d+/\d+\)\s*$', '', content, flags=re.MULTILINE)
        
        if len(content) < 20:
            continue
        
        questions.append({
            'question_num': q_num,
            'content': content[:2000],  # Truncate very long content
            'e_points': e_pts,
            'c_points': c_pts,
            'a_points': a_pts,
            'year': year,
            'term': term,
            'course': course,
        })
    
    return questions

def main():
    print('NP PDF Downloader and Parser\n')
    
    all_questions = []
    
    for url, course, year, term in NP_PDFS:
        pdf_name = url.split('/')[-1]
        pdf_path = DATA_DIR / pdf_name
        
        print(f'\n[{pdf_name}] {course} {year} {term}')
        
        if not download_pdf(url, pdf_path):
            continue
        
        questions = parse_np_pdf(pdf_path, course, year, term)
        print(f'  Extracted {len(questions)} questions')
        
        for q in questions:
            q['source_url'] = url
        
        all_questions.extend(questions)
        
        # Small delay between downloads
        import time
        time.sleep(0.5)
    
    # Save all parsed questions
    out_path = DATA_DIR / 'all-np-questions.json'
    json.dump(all_questions, open(out_path, 'w'), indent=2, ensure_ascii=False)
    print(f'\nTotal: {len(all_questions)} questions saved to {out_path}')

if __name__ == '__main__':
    main()