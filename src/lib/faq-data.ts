/**
 * Kanonsvar för FAQ — vuxna som vill höja gymnasiebetyg.
 * Svar ska vara citerbara (direkt mening först) och länka ekosystemet där det hjälper.
 */

export interface FaqItem {
  id: string;
  question: string;
  /** Ren text för JSON-LD (utan markdown) */
  answerText: string;
  /** HTML-säkra stycken för UI; länkar renderas i komponenten via answerParts */
  answerParts: FaqPart[];
  tags?: string[];
}

export type FaqPart =
  | { type: 'text'; text: string }
  | { type: 'link'; href: string; label: string; external?: boolean };

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'vad-ar-provning',
    question: 'Vad är en prövning för betyg?',
    answerText:
      'En prövning är en bedömning av dina kunskaper mot hela betygskriterierna i en kurs, en nivå i ett ämne eller ett helt ämne. Det är inte en komplettering av en del — hela kursen eller nivån prövas. Prövning anordnas av skola eller kommun (ofta komvux), inte av Prövning.se. Officiell information finns hos Skolverket.',
    answerParts: [
      {
        type: 'text',
        text: 'En prövning är en bedömning av dina kunskaper mot hela betygskriterierna i en kurs, en nivå i ett ämne eller ett helt ämne. Det är inte en komplettering av en del — hela kursen eller nivån prövas. Prövning anordnas av skola eller kommun (ofta komvux), inte av Prövning.se. Officiell information: ',
      },
      {
        type: 'link',
        href: 'https://www.skolverket.se/styrning-och-ansvar/regler-och-ansvar/ansvar-i-skolfragor/provning-for-betyg',
        label: 'Skolverket om prövning för betyg',
        external: true,
      },
      { type: 'text', text: '.' },
    ],
    tags: ['grund'],
  },
  {
    id: 'provning-vs-kurs-vs-np',
    question: 'Vad är skillnaden mellan prövning, att läsa en kurs och nationella prov?',
    answerText:
      'Prövning ger betyg efter en bedömning utan att du nödvändigtvis läst hela kursen i klass. Att läsa kurs på komvux eller gymnasiet innebär undervisning över tid med vanliga betyg. Nationella prov är standardiserade prov i vissa ämnen under pågående utbildning — de är inte samma sak som en prövning, även om du kan öva på liknande uppgifter.',
    answerParts: [
      {
        type: 'text',
        text: 'Prövning ger betyg efter en bedömning utan att du nödvändigtvis läst hela kursen i klass. Att läsa kurs på komvux eller gymnasiet innebär undervisning över tid med vanliga betyg. Nationella prov är standardiserade prov i vissa ämnen under pågående utbildning — de är inte samma sak som en prövning. För arkiv och proveniens kring nationella prov, se ',
      },
      { type: 'link', href: 'https://npprov.se', label: 'npprov.se', external: true },
      { type: 'text', text: '. För mer träning i NP-format: ' },
      {
        type: 'link',
        href: 'https://npmonstret.se/komvux',
        label: 'NP-Monstret komvux',
        external: true,
      },
      { type: 'text', text: '.' },
    ],
    tags: ['grund'],
  },
  {
    id: 'gymnasium-eller-komvux',
    question: 'Ska jag pröva via gymnasiet eller komvux som vuxen?',
    answerText:
      'De flesta vuxna som vill höja eller komplettera gymnasiebetyg går via kommunal vuxenutbildning (komvux). Där kan du läsa kurser eller anmäla dig till prövning enligt kommunens rutin. Är du fortfarande elev på en gymnasieskola gäller i första hand prövning vid den egna skolenheten, med särskilda begränsningar om du redan har godkänt betyg. Kontakta SYV eller din skola om du är osäker.',
    answerParts: [
      {
        type: 'text',
        text: 'De flesta vuxna som vill höja eller komplettera gymnasiebetyg går via kommunal vuxenutbildning (komvux). Där kan du läsa kurser eller anmäla dig till prövning enligt kommunens rutin. Är du fortfarande elev på en gymnasieskola gäller i första hand prövning vid den egna skolenheten, med särskilda begränsningar om du redan har godkänt betyg. Se steg-för-steg på ',
      },
      { type: 'link', href: '/anmalan', label: 'hur du anmäler dig' },
      { type: 'text', text: '.' },
    ],
    tags: ['anmalan'],
  },
  {
    id: 'hur-anmaler-jag',
    question: 'Hur anmäler jag mig till en prövning?',
    answerText:
      'Det finns ingen nationell e-tjänst. Du anmäler dig via din kommuns komvux (vanligast för vuxna) eller via den gymnasieskola som anordnar ämnet. Börja på kommunens webbplats, sök på prövning, och följ deras anmälningsrutin. Skolverket beskriver rätten till prövning; kommunen eller skolan genomför den.',
    answerParts: [
      {
        type: 'text',
        text: 'Det finns ingen nationell e-tjänst. Du anmäler dig via din kommuns komvux (vanligast för vuxna) eller via den gymnasieskola som anordnar ämnet. Börja på kommunens webbplats, sök på "prövning", och följ deras rutin. Praktisk guide: ',
      },
      { type: 'link', href: '/anmalan', label: 'Anmälan till prövning' },
      { type: 'text', text: '. Regler: ' },
      {
        type: 'link',
        href: 'https://www.skolverket.se/styrning-och-ansvar/regler-och-ansvar/ansvar-i-skolfragor/provning-for-betyg',
        label: 'Skolverket',
        external: true,
      },
      { type: 'text', text: '.' },
    ],
    tags: ['anmalan'],
  },
  {
    id: 'kostar-det',
    question: 'Kostar en prövning pengar?',
    answerText:
      'Övning på Prövning.se är gratis. Själva prövningen hos skola eller kommun kan vara avgiftsbelagd — det bestäms lokalt. Kolla alltid din kommuns eller skolas information om avgift innan du anmäler dig.',
    answerParts: [
      {
        type: 'text',
        text: 'Övning på Prövning.se är gratis. Själva prövningen hos skola eller kommun kan vara avgiftsbelagd — det bestäms lokalt. Kolla alltid din kommuns eller skolas information om avgift innan du anmäler dig. Skolverket har vägledning om kostnad under ',
      },
      {
        type: 'link',
        href: 'https://www.skolverket.se/styrning-och-ansvar/regler-och-ansvar/ansvar-i-skolfragor/provning-for-betyg',
        label: 'Prövning för betyg',
        external: true,
      },
      { type: 'text', text: '.' },
    ],
    tags: ['anmalan'],
  },
  {
    id: 'far-jag-prova-igen',
    question: 'Får jag pröva om jag redan har F eller ett godkänt betyg?',
    answerText:
      'Det beror på om du är elev i gymnasieskolan eller inte, och på skolform. På komvux finns ofta möjlighet att pröva även om du tidigare fått betyg. För gymnasieelever gäller andra begränsningar om du redan har godkänt betyg på nivån. Läs Skolverkets avsnitt för gymnasiet respektive komvux, eller fråga din skola/SYV.',
    answerParts: [
      {
        type: 'text',
        text: 'Det beror på om du är elev i gymnasieskolan eller inte, och på skolform. På komvux finns ofta möjlighet att pröva även om du tidigare fått betyg. För gymnasieelever gäller andra begränsningar om du redan har godkänt betyg på nivån. Läs ',
      },
      {
        type: 'link',
        href: 'https://www.skolverket.se/styrning-och-ansvar/regler-och-ansvar/ansvar-i-skolfragor/provning-for-betyg',
        label: 'Skolverket om prövning',
        external: true,
      },
      { type: 'text', text: ' eller fråga din skola/SYV.' },
    ],
    tags: ['regler'],
  },
  {
    id: 'vad-kravs-program',
    question: 'Hur vet jag vilka mattekurser jag behöver för mitt program?',
    answerText:
      'Kraven beror på utbildning och antagningsväg. Använd NP-Monstrets antagningskoll som riktmärke (historiska poäng är inte garanti), och bekräfta alltid mot den utbildning du söker. När du vet nivån kan du öva matte här eller bredare på NP-Monstret.',
    answerParts: [
      {
        type: 'text',
        text: 'Kraven beror på utbildning och antagningsväg. Använd ',
      },
      {
        type: 'link',
        href: 'https://npmonstret.se/antagningskoll?utm_source=provning&utm_medium=faq&utm_campaign=faq',
        label: 'NP-Monstrets antagningskoll',
        external: true,
      },
      {
        type: 'text',
        text: ' som riktmärke (inte garanti), och bekräfta alltid mot den utbildning du söker. När du vet nivån: ',
      },
      { type: 'link', href: '/kurser', label: 'öva matte här' },
      { type: 'text', text: ' eller träna bredare på ' },
      {
        type: 'link',
        href: 'https://npmonstret.se/komvux?utm_source=provning&utm_medium=faq&utm_campaign=faq',
        label: 'NP-Monstret komvux',
        external: true,
      },
      { type: 'text', text: '.' },
    ],
    tags: ['behorighet'],
  },
  {
    id: 'hur-pluggar-jag',
    question: 'Hur pluggar jag effektivt inför en prövning i matte?',
    answerText:
      'Träna aktivt på uppgifter i rätt kurs och variant, gå igenom facit, och upprepa svaga områden. Börja med Prövning.se för Matematik 1–3. För mer träning, fler ämnen och komvux-anpassat material: NP-Monstret. För att se hur nationella prov ser ut: npprov.se.',
    answerParts: [
      {
        type: 'text',
        text: 'Träna aktivt på uppgifter i rätt kurs och variant, gå igenom facit, och upprepa svaga områden. Börja med ',
      },
      { type: 'link', href: '/kurser', label: 'kurserna här' },
      {
        type: 'text',
        text: '. För mer träning, fler ämnen och komvux-anpassat material: ',
      },
      {
        type: 'link',
        href: 'https://npmonstret.se',
        label: 'NP-Monstret',
        external: true,
      },
      { type: 'text', text: '. För NP-arkiv: ' },
      { type: 'link', href: 'https://npprov.se', label: 'npprov.se', external: true },
      { type: 'text', text: '.' },
    ],
    tags: ['ovning'],
  },
  {
    id: 'gy25',
    question: 'Vad betyder Gy25 för prövning?',
    answerText:
      'Gy25 är den läroplan med ämnesbetyg som gäller från 1 juli 2025. Det finns övergångsregler för den som påbörjat utbildning tidigare — bland annat möjlighet att under vissa villkor pröva enligt äldre bestämmelser fram till 2030. Läs alltid Skolverkets aktuella text; Prövning.se ersätter inte juridisk rådgivning.',
    answerParts: [
      {
        type: 'text',
        text: 'Gy25 är den läroplan med ämnesbetyg som gäller från 1 juli 2025. Det finns övergångsregler för den som påbörjat utbildning tidigare. Läs ',
      },
      {
        type: 'link',
        href: 'https://www.skolverket.se/styrning-och-ansvar/regler-och-ansvar/ansvar-i-skolfragor/provning-for-betyg',
        label: 'Skolverket om prövning och övergångar',
        external: true,
      },
      { type: 'text', text: ' och ' },
      {
        type: 'link',
        href: 'https://www.skolverket.se/styrning-och-ansvar/forandringar-inom-skolomradet/gy25----amnesbetyg-pa-gymnasial-niva',
        label: 'Gy25',
        external: true,
      },
      { type: 'text', text: '.' },
    ],
    tags: ['regler'],
  },
  {
    id: 'hogre-niva',
    question: 'Kan jag pröva en högre mattenivå utan betyg på lägre nivå?',
    answerText:
      'Enligt Skolverket är det i princip möjligt att pröva en högre nivå även utan betyg på lägre nivåer, med särskilda följder för hur betyg räknas. Detaljerna är viktiga — läs Skolverket eller fråga din skola innan du planerar.',
    answerParts: [
      {
        type: 'text',
        text: 'Enligt Skolverket är det i princip möjligt att pröva en högre nivå även utan betyg på lägre nivåer, med särskilda följder för hur betyg räknas. Läs detaljerna hos ',
      },
      {
        type: 'link',
        href: 'https://www.skolverket.se/styrning-och-ansvar/regler-och-ansvar/ansvar-i-skolfragor/provning-for-betyg',
        label: 'Skolverket',
        external: true,
      },
      { type: 'text', text: ' eller fråga din skola.' },
    ],
    tags: ['regler'],
  },
  {
    id: 'hela-kriterierna',
    question: 'Prövas hela kursen eller bara det jag är osäker på?',
    answerText:
      'En prövning avser alltid hela kursen, nivån eller ämnet — inte enbart utvalda delar. Läraren behöver underlag för att bedöma dig mot betygskriterierna. Därför lönar det sig att öva brett, inte bara på ett delområde.',
    answerParts: [
      {
        type: 'text',
        text: 'En prövning avser alltid hela kursen, nivån eller ämnet — inte enbart utvalda delar. Läraren behöver underlag för att bedöma dig mot betygskriterierna. Därför lönar det sig att öva brett. Börja med ',
      },
      { type: 'link', href: '/kurser', label: 'Matematik 1–3 här' },
      { type: 'text', text: '.' },
    ],
    tags: ['grund'],
  },
  {
    id: 'tid',
    question: 'Hur lång tid tar det innan jag kan göra prövningen?',
    answerText:
      'Det är inte nationellt reglerat till en exakt deadline på samma sätt överallt. Skolan eller kommunen organiserar prövningen. Räkna med att anmälan, information och genomförande tar tid — börja tidigt och följ lokal information.',
    answerParts: [
      {
        type: 'text',
        text: 'Det är inte nationellt reglerat till en exakt deadline på samma sätt överallt. Skolan eller kommunen organiserar prövningen. Börja tidigt: se ',
      },
      { type: 'link', href: '/anmalan', label: 'anmälningsguiden' },
      { type: 'text', text: ' och din kommuns sida.' },
    ],
    tags: ['anmalan'],
  },
  {
    id: 'provning-se-vs-monstret',
    question: 'Vad är skillnaden mellan Prövning.se och NP-Monstret?',
    answerText:
      'Prövning.se: förstå prövning, hur du anmäler dig (lokalt), och övning i Matematik 1–3. NP-Monstret: bredare träning, NPcoachen, antagningskoll och fler ämnen — det enda betalda produkten i ekosystemet. Ingen av sajterna tar emot anmälan eller sätter betyg.',
    answerParts: [
      {
        type: 'text',
        text: 'Prövning.se: förstå prövning, hur du anmäler dig (lokalt), och övning i Matematik 1–3. NP-Monstret: bredare träning, NPcoachen, ',
      },
      {
        type: 'link',
        href: 'https://npmonstret.se/antagningskoll?utm_source=provning&utm_medium=faq&utm_campaign=faq',
        label: 'antagningskoll',
        external: true,
      },
      { type: 'text', text: ' och fler ämnen. Ingen av sajterna tar emot anmälan. Startsida: ' },
      {
        type: 'link',
        href: 'https://npmonstret.se?utm_source=provning&utm_medium=faq&utm_campaign=faq',
        label: 'npmonstret.se',
        external: true,
      },
      { type: 'text', text: '.' },
    ],
    tags: ['ekosystem'],
  },
  {
    id: 'npguide',
    question: 'Var hittar jag regler och forskning om nationella prov?',
    answerText:
      'På npguide.se finns guider för skolpersonal, regler, datum och forskningsbaserade artiklar om nationella prov. Prövning.se länkar dit när frågan handlar om NP-regler eller forskning — inte när det handlar om kommunens anmälningsblankett.',
    answerParts: [
      {
        type: 'text',
        text: 'På ',
      },
      {
        type: 'link',
        href: 'https://npguide.se',
        label: 'npguide.se',
        external: true,
      },
      {
        type: 'text',
        text: ' finns guider för skolpersonal, regler, datum och forskningsbaserade artiklar. Se även ',
      },
      {
        type: 'link',
        href: 'https://npguide.se/faq',
        label: 'NP-guides FAQ',
        external: true,
      },
      { type: 'text', text: ' och ' },
      {
        type: 'link',
        href: 'https://npguide.se/forskning',
        label: 'forskning',
        external: true,
      },
      { type: 'text', text: '.' },
    ],
    tags: ['ekosystem'],
  },
  {
    id: 'ar-det-officiellt',
    question: 'Är Prövning.se en officiell myndighetssajt?',
    answerText:
      'Nej. Prövning.se är en oberoende, gratis tjänst för vägledning och övning. Officiella regler finns hos Skolverket. Anmälan och avgifter sköts av din kommun eller skola.',
    answerParts: [
      {
        type: 'text',
        text: 'Nej. Prövning.se är en oberoende, gratis tjänst för vägledning och övning. Officiella regler: ',
      },
      {
        type: 'link',
        href: 'https://www.skolverket.se/styrning-och-ansvar/regler-och-ansvar/ansvar-i-skolfragor/provning-for-betyg',
        label: 'Skolverket',
        external: true,
      },
      {
        type: 'text',
        text: '. Anmälan och avgifter sköts av din kommun eller skola. Våra källor: ',
      },
      { type: 'link', href: '/kallor', label: 'källor' },
      { type: 'text', text: '.' },
    ],
    tags: ['grund'],
  },
  {
    id: 'underkand',
    question: 'Vad händer om jag blir underkänd på prövningen?',
    answerText:
      'Du får det betyg som bedömningen ger, inklusive F om du inte når E. Du kan ofta anmäla dig till ny prövning eller läsa kurs — det styrs lokalt. Prövning.se tar inte emot anmälan och sätter inga betyg.',
    answerParts: [
      {
        type: 'text',
        text: 'Du får det betyg som bedömningen ger, inklusive F om du inte når E. Du kan ofta anmäla dig till ny prövning eller läsa kurs — det styrs lokalt. Fråga din skola eller kommun. Officiella regler: ',
      },
      {
        type: 'link',
        href: 'https://www.skolverket.se/styrning-och-ansvar/regler-och-ansvar/ansvar-i-skolfragor/provning-for-betyg',
        label: 'Skolverket',
        external: true,
      },
      { type: 'text', text: '.' },
    ],
    tags: ['regler'],
  },
  {
    id: 'flera-ganger',
    question: 'Kan jag pröva samma kurs flera gånger?',
    answerText:
      'Ofta ja på komvux, men antal tillfällen, avgift och tider bestäms lokalt. Gymnasieelever har andra begränsningar. Fråga din kommun eller skola innan du planerar omprövning.',
    answerParts: [
      {
        type: 'text',
        text: 'Ofta ja på komvux, men antal tillfällen, avgift och tider bestäms lokalt. Gymnasieelever har andra begränsningar. Se ',
      },
      { type: 'link', href: '/anmalan', label: 'anmälningsguiden' },
      { type: 'text', text: ' och din kommuns sida.' },
    ],
    tags: ['anmalan'],
  },
  {
    id: 'betyg-tid',
    question: 'Hur lång tid tar det innan jag får betyg efter prövningen?',
    answerText:
      'Det finns ingen nationell deadline som gäller alla. Skolan eller kommunen sätter tidplan för genomförande och betygssättning. Räkna med att det kan ta veckor — fråga vid anmälan.',
    answerParts: [
      {
        type: 'text',
        text: 'Det finns ingen nationell deadline som gäller alla. Skolan eller kommunen sätter tidplan. Fråga vid anmälan. Praktiska steg: ',
      },
      { type: 'link', href: '/anmalan', label: 'hur du anmäler dig' },
      { type: 'text', text: '.' },
    ],
    tags: ['anmalan'],
  },
  {
    id: 'id-legitimation',
    question: 'Behöver jag legitimering eller ID vid prövning?',
    answerText:
      'Skolan eller kommunen bestämmer vilka identifikationskrav som gäller vid genomförandet. Ta med giltig legitimation om du blir ombedd. Prövning.se hanterar inte incheckning eller ID-kontroll.',
    answerParts: [
      {
        type: 'text',
        text: 'Skolan eller kommunen bestämmer vilka identifikationskrav som gäller vid genomförandet. Ta med giltig legitimation om du blir ombedd. Följ den information du får när du anmäler dig via ',
      },
      { type: 'link', href: '/anmalan', label: 'kommun eller skola' },
      { type: 'text', text: '.' },
    ],
    tags: ['anmalan'],
  },
  {
    id: 'annan-kommun',
    question: 'Kan jag pröva i en annan kommun än där jag bor?',
    answerText:
      'Ibland — det beror på kommunens och skolans erbjudande. Vissa tar emot sökande från andra kommuner, andra prioriterar boende i kommunen. Kontakta den skola eller komvux där du vill pröva.',
    answerParts: [
      {
        type: 'text',
        text: 'Ibland — det beror på kommunens och skolans erbjudande. Kontakta den skola eller komvux där du vill pröva. Börja med ',
      },
      { type: 'link', href: '/anmalan', label: 'anmälningsguiden' },
      { type: 'text', text: ' och sök din kommuns webbplats.' },
    ],
    tags: ['anmalan'],
  },
  {
    id: 'npcoachen',
    question: 'Kan jag använda NPcoachen inför prövning?',
    answerText:
      'Ja som frivillig träning. NPcoachen på NP-Monstret bygger nästa träningssteg utifrån quiz-svar och betygsmål. Den ersätter inte prövningen, läraren eller Skolverket. Anmälan sker fortfarande via kommun eller skola — varken Prövning.se eller NP-Monstret tar emot anmälan.',
    answerParts: [
      {
        type: 'text',
        text: 'Ja som frivillig träning. ',
      },
      {
        type: 'link',
        href: 'https://npmonstret.se/npcoachen?utm_source=provning&utm_medium=faq&utm_campaign=faq',
        label: 'NPcoachen på NP-Monstret',
        external: true,
      },
      {
        type: 'text',
        text: ' bygger nästa träningssteg utifrån quiz-svar och betygsmål. Den ersätter inte prövning, lärare eller Skolverket. Anmälan sker via kommun eller skola — se ',
      },
      { type: 'link', href: '/anmalan', label: 'anmälan' },
      { type: 'text', text: '.' },
    ],
    tags: ['ovning', 'ekosystem'],
  },
  {
    id: 'vilken-matte',
    question: 'Vilken mattekurs ska jag pröva — 1, 2 eller 3?',
    answerText:
      'Det beror på vad din utbildning kräver. Många högskoleförberedande spår kräver Matematik 2 eller 3. Använd antagningskoll som riktmärke och bekräfta mot programmet du söker. Öva sedan rätt nivå här.',
    answerParts: [
      {
        type: 'text',
        text: 'Det beror på vad din utbildning kräver. Använd ',
      },
      {
        type: 'link',
        href: 'https://npmonstret.se/antagningskoll?utm_source=provning&utm_medium=faq&utm_campaign=faq',
        label: 'NP-Monstrets antagningskoll',
        external: true,
      },
      {
        type: 'text',
        text: ' som riktmärke och bekräfta mot programmet. Öva sedan ',
      },
      { type: 'link', href: '/kurser', label: 'Matematik 1–3 här' },
      { type: 'text', text: '.' },
    ],
    tags: ['behorighet', 'ovning'],
  },
  {
    id: 'distans',
    question: 'Kan jag göra prövning på distans?',
    answerText:
      'Det är inte en nationell standard. Vissa skolor erbjuder digitala eller hybridlösningar, men det är lokalt beslut. Fråga den skola eller kommun som anordnar prövningen.',
    answerParts: [
      {
        type: 'text',
        text: 'Det är inte en nationell standard. Vissa skolor erbjuder digitala eller hybridlösningar, men det är lokalt beslut. Börja via ',
      },
      { type: 'link', href: '/anmalan', label: 'anmälningsguiden' },
      { type: 'text', text: ' och kontakta anordnaren.' },
    ],
    tags: ['anmalan'],
  },
  {
    id: 'np-vs-provning-igen',
    question: 'Måste jag göra nationella prov om jag gör prövning?',
    answerText:
      'Nej — prövning och nationella prov är olika saker. Nationella prov är standardiserade prov under pågående utbildning. Prövning är en separat bedömning mot betygskriterierna för en hel kurs eller nivå. Skolan kan använda olika underlag i bedömningen; det styrs inte av Prövning.se.',
    answerParts: [
      {
        type: 'text',
        text: 'Nej — prövning och nationella prov är olika saker. Nationella prov är standardiserade prov under pågående utbildning. Prövning är en separat bedömning mot betygskriterierna. Mer om skillnaden: se FAQ om ',
      },
      { type: 'link', href: '/faq', label: 'prövning vs kurs vs NP' },
      { type: 'text', text: ' och arkiv på ' },
      { type: 'link', href: 'https://npprov.se', label: 'npprov.se', external: true },
      { type: 'text', text: '.' },
    ],
    tags: ['grund'],
  },
];

export const FAQ_HOME_IDS = [
  'vad-ar-provning',
  'hur-anmaler-jag',
  'vad-kravs-program',
  'hur-pluggar-jag',
  'gymnasium-eller-komvux',
  'kostar-det',
  'provning-vs-kurs-vs-np',
  'ar-det-officiellt',
  'vilken-matte',
  'npcoachen',
  'underkand',
  'gy25',
] as const;

/** FAQ för kursöversikt och level-sidor */
export const FAQ_KURSER_IDS = [
  'hur-pluggar-jag',
  'vilken-matte',
  'hela-kriterierna',
  'vad-kravs-program',
  'npcoachen',
  'provning-se-vs-monstret',
] as const;

export function faqByIds(ids: readonly string[]): FaqItem[] {
  return ids
    .map((id) => FAQ_ITEMS.find((f) => f.id === id))
    .filter((f): f is FaqItem => Boolean(f));
}
