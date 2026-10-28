const gap = answer => `<button class="gap" type="button" aria-label="Открыть пропуск" aria-pressed="false">${answer}</button>`;
const reveal = answer => `<button class="reveal" type="button" aria-label="Показать ответ" aria-pressed="false">${answer}</button>`;
const list = items => `<ol class="items">${items.map(item => `<li>${item}</li>`).join('')}</ol>`;
const pairs = (items,start=1) => `<ol class="items answer-pairs" start="${start}">${items.map(([question,answer]) => `<li>${question}${Array.isArray(answer) ? answer.map(reveal).join('') : reveal(answer)}</li>`).join('')}</ol>`;
const part = (letter,title,body,hint='') => `<section class="part"><h3>${letter ? `<span class="letter">${letter})</span>` : ''}${title}</h3>${hint ? `<p class="hint">${hint}</p>` : ''}${body}</section>`;
const note = text => `<p class="notice">${text}</p>`;
const dialogue = lines => `<div class="dialogue">${lines.map(([person,line]) => `<p><b>${person} :</b> ${line}</p>`).join('')}</div>`;
const audioBlank = '<span class="audio-blank" aria-label="Пропуск из аудиозадания">…</span>';
const audioNote = note('Аудиозапись не приложена. Задание сохранено, точные ответы по записи пока недоступны.');

const exercises = [
{n:1,title:'Imaginez une réponse / une question.',page:138,parts:[
part('a','Imaginez une réponse. Придумайте ответ.',list([
`— Je voudrais aller au musée d’art moderne cet après-midi. Tu veux venir avec moi ?<br>— Oui, ${gap('avec plaisir !')}`,
`— Yves a trois places pour un spectacle ce soir. Tu voudrais venir avec nous ?<br>— Non, ${gap('merci. Je suis occupé ce soir.')}`,
`— Est-ce que tu voudrais aller en discothèque samedi soir ?<br>— Oui, ${gap('c’est une bonne idée !')}`,
`— Il est minuit. Je vais au lit.<br>— ${gap('Bonne nuit')}, à demain !`,
`— Bonjour, excusez-moi, je suis en retard.<br>— ${gap('Ce n’est pas grave.')}`,
`— Vous voulez un café ?<br>— ${gap('Oui, avec plaisir.')}<br>— Je vous mets un peu de sucre ?<br>— ${gap('Non, merci')}, pas de sucre.`
])),
part('b','Imaginez une question. Придумайте вопрос.',pairs([
['— … ?<br>— Oui, c’est une très bonne idée ! J’adore le théâtre ! On va voir quelle pièce ?','Tu voudrais aller au théâtre avec moi ce soir ?'],
['— … ?<br>— C’est très gentil mais je suis un peu fatigué ce soir. Désolé ! Mais on peut se voir demain soir si tu es libre ?','Tu veux venir dîner chez moi ce soir ?'],
['— … ?<br>— Oui, avec plaisir ! Je veux bien voir cette exposition. Est-ce que mon copain Cédric peut venir avec nous ?','Tu voudrais aller voir cette exposition avec moi ?'],
['— … ?<br>— Avec plaisir, merci. J’aime beaucoup la tarte au citron.','Vous voulez une part de tarte au citron ?']
  ]))]},
{n:2,title:'Demandez poliment. Сформулируйте вежливую просьбу.',page:139,parts:[
note('Modèle 1 : un dessert → Je voudrais un dessert, s’il vous plaît.<br>Modèle 2 : voir ton projet → Je voudrais voir ton projet.'),
audioNote,
'<p class="plain">На странице приведены только модели; остальные реплики относятся к аудиозаданию.</p>'
]},
{n:3,title:'Les verbes pronominaux.',page:139,parts:[
part('a','Ouvrez les parenthèses. Раскройте скобки.',list([
`Je (se présenter) ${gap('me présente')} : je (s’appeler) ${gap('m’appelle')} Marc Cervais.`,
`Nous (se voir) ${gap('nous voyons')} souvent.`,
`Vous (s’intéresser) ${gap('vous intéressez')} à cet écrivain ?`,
`Les petits (s’amuser) ${gap('s’amusent')} bien.`,
`Tu (se reposer) ${gap('te reposes')} le soir ?`,
`Où est-ce que nous (se trouver) ${gap('nous trouvons')} ?`,
`Tout le monde sait qu’ils (s’aimer) ${gap('s’aiment')}.`,
`Nous (se connaître) ${gap('nous connaissons')} bien.`,
`Je (se préparer) ${gap('me prépare')} pour partir.`,
`Vous (s’écrire) ${gap('vous écrivez')} souvent ?`,
`Nous (se téléphoner) ${gap('nous téléphonons')} tous les jours.`,
`Vous voulez (se baigner) ${gap('vous baigner')} ?`,
`Je vais (se promener) ${gap('me promener')} sur les quais (по набережным) de la Seine.`
])),
part('b','Dites à la forme négative.',pairs([
['Il s’intéresse à la littérature française.','Il ne s’intéresse pas à la littérature française.'],
['Ils se voient tous les jours.','Ils ne se voient pas tous les jours.'],
['Vous vous promenez dans la ville.','Vous ne vous promenez pas dans la ville.'],
['Nous nous amusons beaucoup.','Nous ne nous amusons pas beaucoup.'],
['Je me trouve près de la gare.','Je ne me trouve pas près de la gare.'],
['Il se présente aux amis de sa mère.','Il ne se présente pas aux amis de sa mère.'],
['Tu te reposes après le travail.','Tu ne te reposes pas après le travail.'],
['On se baigne beaucoup cet été.','On ne se baigne pas beaucoup cet été.'],
['Nous nous reposons le soir.','Nous ne nous reposons pas le soir.'],
['Vous vous intéressez à ses histoires.','Vous ne vous intéressez pas à ses histoires.']
])),
part('c','Complétez les phrases en choisissant les bons verbes.',`${note('se voir, se trouver, se présenter, se reposer, s’amuser, s’appeler, se promener. В некоторых фразах возможны несколько вариантов; показан один подходящий.')}${list([
`Où est-ce que vous ${gap('vous trouvez')} ? Je ne vous vois pas.`,
`Je préfère ${gap('me promener')} dans le Jardin du Luxembourg.`,
`Vous ${gap('vous reposez')} bien ?`,
`Nous ${gap('nous voyons')} toujours le soir.`,
`On ${gap('s’amuse')} bien à ses fêtes.`,
`Vous ${gap('vous promenez')} souvent ?`,
`Elle ${gap('s’appelle')} Florence Dumont.`,
`Les messieurs ${gap('se présentent')} toujours aux dames, Léo.`
])}`),
part('d','Traduisez.',pairs([
['они не видятся','Ils ne se voient pas.'],['вы находитесь','Vous vous trouvez.'],['они развлекаются','Ils s’amusent.'],['мы не отдыхаем','Nous ne nous reposons pas.'],['я нахожусь','Je me trouve.'],['он представляется','Il se présente.'],['вы не гуляете','Vous ne vous promenez pas.'],['они не интересуются','Ils ne s’intéressent pas.'],['я отдыхаю','Je me repose.'],['ты не купаешься','Tu ne te baignes pas.'],['меня зовут Анна','Je m’appelle Anne.'],['мы видимся','Nous nous voyons.'],['ты гуляешь','Tu te promènes.'],['я не развлекаюсь','Je ne m’amuse pas.'],['мы не гуляем','Nous ne nous promenons pas.'],['вы интересуетесь','Vous vous intéressez.']
])),
part('e','Répondez aux questions.',pairs([
['Vous vous appelez comment ?','Je m’appelle Denis.'],
['Est-ce que vous vous reposez beaucoup ?','Non, je ne me repose pas beaucoup pendant la semaine.'],
['Qu’est-ce que vous faites pour vous reposer ?','Pour me reposer, je lis et je me promène.'],
['Où se trouve la Tour Eiffel ? le Colisée ? le Musée des Beaux-Arts Pouchkine ? le Musée Prado ?',['La Tour Eiffel se trouve à Paris.','Le Colisée se trouve à Rome.','Le Musée des Beaux-Arts Pouchkine se trouve à Moscou.','Le Musée du Prado se trouve à Madrid.']],
['Où préférez-vous vous promener : dans un parc, dans la ville, sur la plage ?','Je préfère me promener dans un parc.'],
['Vous aimez vous promener quand il pleut ?','Non, je n’aime pas me promener quand il pleut.'],
['Vous préférez vous baigner à la mer ou dans une piscine ?','Je préfère me baigner à la mer.'],
['Qu’est-ce qu’on dit pour se présenter ?','On dit : « Bonjour, je m’appelle Denis. »'],
['Est-ce que vous vous intéressez à la musique ? à la littérature ? à l’architecture ? à la peinture ? À quoi est-ce que vous vous intéressez ?','Je m’intéresse à la musique et à la littérature.']
]))]},
{n:4,title:'Écoutez et complétez le dialogue.',page:140,parts:[audioNote,dialogue([
['Mme Martin','Alors, comment vas-tu, ma chérie ?'],
['Mme Picard',`Oh, très bien. Je suis très contente d’être à la retraite. Je ${audioBlank} après le petit-déjeuner, je ${audioBlank} après le déjeuner, et le soir, je ${audioBlank}. Je ${audioBlank} beaucoup, je ${audioBlank} au cinéma, au théâtre, je ${audioBlank} mes amies.`],
['Mme Martin',`Tu ${audioBlank} souvent tes amies ?`],
['Mme Picard',`Oh oui, on ${audioBlank} souvent. On ${audioBlank}, on ${audioBlank} sur Facebook. On ${audioBlank} bien. Et toi, ta retraite, c’est bientôt ?`],
['Mme Martin',`Oui. Je ${audioBlank} déjà. Mais c’est triste d’être à la retraite, d’être ${audioBlank}.`],
['Mme Picard',`Mais non, on n’est pas ${audioBlank}, on est ${audioBlank} ! La vie ${audioBlank} à 60 ans ! La retraite, c’est comme un long week-end.`]
])]},
{n:5,title:'Mettez les mots dans l’ordre.',page:140,parts:[pairs([
['beaucoup / les / garçons / au / jouent / football.','Les garçons jouent beaucoup au football.'],
['dors / assez / pas / je / ne.','Je ne dors pas assez.'],
['enfants / elle / discute / avec / beaucoup / ses.','Elle discute beaucoup avec ses enfants.'],
['télévision / trop / regardent / ils / la.','Ils regardent trop la télévision.'],
['peu / élèves / lisent / les.','Les élèves lisent peu.'],
['n’ / assez / ils / pas / écrivent.','Ils n’écrivent pas assez.'],
['le / peu / connais / je / un.','Je le connais un peu.']
])]},
{n:6,title:'Mettez les adverbes dans les phrases.',page:140,parts:[list([
`Dans cette ville il y a ${gap('trop de')} voitures (trop) et ${gap('peu de')} parcs (peu).`,
`Dans ce collège il y a ${gap('beaucoup d’')}élèves (beaucoup) mais ${gap('pas assez de')} professeurs (pas assez).`,
`À la télévision, il y a ${gap('trop de')} débats politiques (trop) et ${gap('peu de')} films intéressants (peu).`,
`Elle a ${gap('beaucoup de')} travail (beaucoup) mais ${gap('pas assez de')} temps pour la famille (pas assez).`,
`Dans ce film il y a ${gap('beaucoup d’')}acteurs célèbres (beaucoup) mais ${gap('peu de')} scènes originales (peu).`,
`Dans votre projet il y a ${gap('beaucoup d’')}idées (beaucoup) mais ${gap('peu de')} logique (f) (peu) !`
])]},
{n:7,title:'Les adverbes et la préposition de.',page:141,parts:[note('Mettez les adverbes dans les phrases avec la préposition de si nécessaire.'),list([
`(trop) Ce professeur est ${gap('trop')} sérieux. Avec lui, nous faisons ${gap('trop d’')}exercices.`,
`(beaucoup, très) Ce bus n’est pas ${gap('très')} confortable. Il n’y a pas ${gap('beaucoup de')} places assises (сидячий).`,
`(très, beaucoup) Il n’y a pas ${gap('beaucoup de')} chemises dans cette boutique, mais toutes les chemises sont ${gap('très')} belles.`,
`(assez) Nous avons ${gap('assez de')} temps libre. Nous allons ${gap('assez')} souvent au cinéma.`,
`(trop) Tous les collègues trouvent que le directeur est ${gap('trop')} sévère (строгий). Il organise ${gap('trop de')} réunions. Il y a souvent ${gap('trop de')} travail ! Tout le monde est ${gap('trop')} nerveux ! Je n’aime pas l’atmosphère au bureau. Il y a ${gap('trop de')} stress (m) !`,
`(peu) Ce film est ${gap('peu')} intéressant ! Il y a ${gap('peu de')} scènes romantiques !`,
`(un peu) Avec ${gap('un peu de')} travail, mais un travail régulier, votre fils va faire des progrès (делать успехи). Il est ${gap('un peu')} fatigué, ${gap('un peu')} nerveux. Il doit se reposer ${gap('un peu')}, et comme ça, il va avoir de bons résultats !`,
`(assez) Les élèves n’ont pas ${gap('assez de')} concentration, ils sont ${gap('assez')} distraits. Ils n’écoutent pas ${gap('assez')} bien leur institutrice.`,
`(beaucoup, très) Cet acteur est ${gap('très')} sympathique ! Il a ${gap('beaucoup de')} charme (m). Je l’aime ${gap('beaucoup')}.`
])] },
{n:8,title:'Traduisez les séries.',page:141,parts:[
part('a','Les verbes.',pairs([
['Он много играет.','Il joue beaucoup.'],['Они слишком много спят.','Ils dorment trop.'],['Они много рисуют.','Ils dessinent beaucoup.'],['Они достаточно много обсуждают.','Ils discutent assez.'],['Они мало отдыхают.','Ils se reposent peu.'],['Я немного прогуляюсь.','Je vais me promener un peu.'],['Вы слишком много читаете.','Vous lisez trop.'],['Они много пишут.','Ils écrivent beaucoup.'],['Они мало помогают.','Ils aident peu.'],['Вы достаточно много занимаетесь.','Vous étudiez assez.']
])),
part('b','Les adjectifs.',pairs([
['Очень милый','très gentil'],['слишком грустный','trop triste'],['достаточно спокойный','assez calme'],['немного странный','un peu bizarre'],['очень простой','très simple'],['достаточно оригинальный','assez original'],['немного рассеянный','un peu distrait'],['слишком дорогой','trop cher']
])),
part('c','Les noms.',pairs([
['Слишком много дел','trop de choses à faire'],['много театров','beaucoup de théâtres'],['достаточно много магазинов','assez de magasins'],['мало ресторанов','peu de restaurants'],['немного времени','un peu de temps'],['достаточно много идей','assez d’idées'],['слишком много пассажиров','trop de passagers'],['много проблем','beaucoup de problèmes'],['мало мест','peu de places'],['немного чая','un peu de thé'],['достаточно много зданий','assez de bâtiments'],['много встреч','beaucoup de rendez-vous']
]))]},
{n:9,title:'Dialogue. « Chez le médecin ».',page:141,parts:[
part('a','Répondez pour la patiente. Ответьте за пациентку.',dialogue([
['La patiente','Docteur, je suis tout le temps fatiguée, stressée, mais je ne sais pas pourquoi.'],
['Le médecin','Voyons, madame. Est-ce que vous travaillez en ce moment ?'],
['La patiente',`(trop) Vous savez, docteur, je ${gap('travaille trop')}. Je suis toute la journée au bureau.`],
['Le médecin','Vous aimez votre travail ?'],
['La patiente',`(beaucoup) Non, je ${gap('n’aime pas beaucoup mon travail')}.`],
['Le médecin','Vous avez assez de temps libre ?'],
['La patiente',`Non, je ${gap('n’ai pas assez de temps libre')}.`],
['Le médecin','Vous avez une famille ? Des enfants ?'],
['La patiente',`Non, je ${gap('n’ai pas de famille ni d’enfants')}.`],
['Le médecin','Est-ce que vous mangez bien ?'],
['La patiente',`(peu) Je ${gap('mange peu' )}. Je n’ai pas très faim.`],
['Le médecin','Vous mangez des fruits et des légumes (овощи) ?'],
['La patiente',`(peu) Je ${gap('mange peu de fruits et de légumes')}.`],
['Le médecin','Vous prenez combien de cafés par jour (в день) ?'],
['La patiente',`(beaucoup) Je ${gap('bois beaucoup de café')} : 4 ou 5 tasses (чашек) par jour.`],
['Le médecin','Oui, c’est beaucoup ! Vous vous reposez après le travail ?'],
['La patiente',`(beaucoup) Non, je ${gap('ne me repose pas beaucoup')}.`],
['Le médecin','Vous vous promenez souvent ?'],
['La patiente',`(un peu) Je ${gap('me promène un peu')}, mais pas tous les jours.`],
['Le médecin','Vous dormez bien ?'],
['La patiente',`(assez) Non, je ${gap('ne dors pas assez')} : 5 heures.`],
['Le médecin','Oui, c’est très peu… Vous faites un peu de sport ?'],
['La patiente',`Non, je ${gap('ne fais pas de sport')}.`],
['Le médecin','Hum… Trop de travail, pas de temps libre, peu de fruits, beaucoup de café, peu de promenades, pas de sport… Je comprends très bien, madame, pourquoi vous êtes toujours fatiguée !']
])),
part('b','Faites un dialogue.',`${note('Vous avez un problème : vous êtes très fatigué(e), ou vous n’êtes pas content(e) de votre travail / de vos études. Vous parlez à votre ami(e). Utilisez : trop, beaucoup, très, assez, un peu, peu.')}<span class="model-label">Пример диалога</span>${reveal('— Tu as l’air très fatigué. Qu’est-ce qui se passe ?<br>— Je travaille trop et je dors peu. Je n’ai pas assez de temps libre.<br>— Tu te reposes un peu le week-end ?<br>— Non, pas beaucoup. J’étudie aussi.<br>— Il faut te reposer et te promener un peu !')}`)
]},
{n:10,title:'Combien d(e).',page:142,parts:[
part('a','Posez des questions avec combien d(e).',pairs([
['Aujourd’hui ils ont <u>trois cours</u>.','Combien de cours est-ce qu’ils ont aujourd’hui ?'],
['Vous allez rester <u>10 jours</u> à Rouen.','Combien de jours est-ce que vous allez rester à Rouen ?'],
['<u>Huit étudiants</u> vont au cours de français.','Combien d’étudiants vont au cours de français ?'],
['Il faut faire <u>cinq exercices</u> pour demain.','Combien d’exercices faut-il faire pour demain ?'],
['<u>Dix élèves</u> apprennent l’italien.','Combien d’élèves apprennent l’italien ?'],
['Les élèves préparent <u>trois chansons</u> pour le concert.','Combien de chansons est-ce que les élèves préparent pour le concert ?'],
['Dans cette université il y a <u>deux piscines</u> !','Combien de piscines y a-t-il dans cette université ?'],
['<u>Vingt professeurs</u> américains vont venir à la conférence.','Combien de professeurs américains vont venir à la conférence ?']
])),
part('b','Répondez aux questions.',pairs([
['Combien d’étudiants est-ce qu’il y a dans votre groupe ? / Combien de collègues est-ce que vous avez ?',['Il y a douze étudiants dans mon groupe.','J’ai huit collègues.']],
['Combien de cours est-ce que vous allez avoir demain ? / Combien d’heures est-ce que vous allez travailler demain ?',['Demain, je vais avoir trois cours.','Demain, je vais travailler huit heures.']],
['Combien d’exercices est-ce que vous faites pour votre cours de français ?','Je fais cinq exercices pour mon cours de français.'],
['Combien de langues est-ce que vous apprenez ?','J’apprends deux langues.'],
['Combien d’écrivains français est-ce que vous connaissez ?','Je connais une dizaine d’écrivains français.']
])),
part('c','Traduisez.',pairs([
['Сколько театров в вашем городе ?','Combien de théâtres y a-t-il dans votre ville ?'],
['Сколько студентов учат английский ?','Combien d’étudiants apprennent l’anglais ?'],
['Сколько языков вы знаете ?','Combien de langues est-ce que vous connaissez ?'],
['Сколько у вас детей ?','Combien d’enfants avez-vous ?'],
['Сколько дней ты хочешь провести (rester) в Париже ?','Combien de jours est-ce que tu veux rester à Paris ?'],
['Сколько статей (article, m) вы напишете ?','Combien d’articles est-ce que vous allez écrire ?']
]))]},
{n:11,title:'Complétez avec quel(s), quelle(s).',page:143,parts:[list([
`${gap('Quelle')} est votre profession ?`,`${gap('Quel')} est l’âge de son fils ?`,`${gap('Quels')} sont vos projets ?`,`${gap('Quelles')} sont leurs idées ?`,`${gap('Quel')} est votre rêve ?`,
`Vous lisez ${gap('quel')} journal ?`,`Vous aimez ${gap('quelle')} voiture ?`,`Tu préfères ${gap('quelle')} photo (f) ?`,`Ils écoutent ${gap('quelles')} chansons ?`,`Nous visitons ${gap('quels')} musées ?`
])]},
{n:12,title:'Posez des questions avec quel(s), quelle(s).',page:143,parts:[
part('','Modèle 1 : ton idée → Quelle est ton idée ?',pairs([
['votre problème →','Quel est votre problème ?'],['ton numéro de téléphone →','Quel est ton numéro de téléphone ?'],['votre adresse (f) →','Quelle est votre adresse ?'],['ton actrice préférée →','Quelle est ton actrice préférée ?'],['la date de son anniversaire →','Quelle est la date de son anniversaire ?']
])),
part('','Modèle 2 : Tu lis un livre. → Quel livre est-ce que tu lis ? / Tu lis quel livre ?',pairs([
['Vous apprenez un poème.','Quel poème est-ce que vous apprenez ?'],['Tu veux visiter une ville.','Quelle ville est-ce que tu veux visiter ?'],['Vous connaissez des écrivains.','Quels écrivains est-ce que vous connaissez ?'],['Tu écris des histoires (f).','Quelles histoires est-ce que tu écris ?'],['Vous écoutez une station de radio.','Quelle station de radio est-ce que vous écoutez ?']
]))]},
{n:13,title:'Posez des questions à votre ami(e).',page:143,parts:[note('Utilisez combien et quel et les mots suivants. Для каждого слова — два примера вопроса.'),pairs([
['étudiant',['Combien d’étudiants y a-t-il dans ton groupe ?','Quel étudiant parle français ?']],
['examen',['Combien d’examens vas-tu passer ?','Quel examen est difficile ?']],
['professeur',['Combien de professeurs connais-tu ?','Quel professeur préfères-tu ?']],
['mot',['Combien de mots français connais-tu ?','Quel mot ne comprends-tu pas ?']],
['portable',['Combien de portables as-tu ?','Quel portable veux-tu acheter ?']],
['musée',['Combien de musées connais-tu ?','Quel musée veux-tu visiter ?']],
['livre',['Combien de livres lis-tu par mois ?','Quel livre lis-tu en ce moment ?']],
['chanson',['Combien de chansons françaises connais-tu ?','Quelle chanson préfères-tu ?']],
['dessert',['Combien de desserts prends-tu ?','Quel dessert voudrais-tu ?']],
['touriste',['Combien de touristes visitent cette ville ?','Quel touriste parle français ?']],
['jour',['Combien de jours restes-tu à Paris ?','Quel jour es-tu libre ?']],
['peintre',['Combien de peintres français connais-tu ?','Quel peintre préfères-tu ?']],
['fille',['Combien de filles y a-t-il dans ton groupe ?','Quelle fille joue du piano ?']],
['robe',['Combien de robes as-tu ?','Quelle robe préfères-tu ?']],
['projet',['Combien de projets as-tu ?','Quel projet prépares-tu ?']]
])]},
{n:14,title:'Construire / traduire.',page:143,parts:[
part('a','Du singulier au pluriel.',pairs([
['Je traduis ce roman. → Nous …','Nous traduisons ce roman.'],
['Le petit construit une grande pyramide. → Les petits …','Les petits construisent une grande pyramide.'],
['Qu’est-ce que tu traduis ? → …','Qu’est-ce que vous traduisez ?'],
['Il construit une belle villa près de Dijon. → …','Ils construisent une belle villa près de Dijon.']
])),
part('b','Du pluriel au singulier.',pairs([
['Nous traduisons les poèmes de Victor Hugo. → Je …','Je traduis les poèmes de Victor Hugo.'],
['Vous ne traduisez pas toutes les phrases. → …','Tu ne traduis pas toutes les phrases.'],
['Qu’est-ce qu’ils construisent ici ? → …','Qu’est-ce qu’il construit ici ?'],
['Vous construisez une nouvelle école ? → …','Tu construis une nouvelle école ?']
]))]},
{n:15,title:'La place et l’accord des adjectifs.',page:144,parts:[
note('Complétez les phrases avec les adjectifs à droite en faisant attention à la place et à l’accord des adjectifs.'),
list([
`Qui est ce ${gap('jeune')} homme ${gap('bizarre')} ? <span class="word-bank">bizarre, jeune</span>`,
`Je voudrais encore une tasse de ce ${gap('bon')} café ${gap('noir')}. <span class="word-bank">bon, noir</span>`,
`Cette ${gap('vieille')} dame ${gap('italienne')} est une touriste ${gap('distraite')}. <span class="word-bank">distrait, italien, vieux</span>`,
`Claire est une ${gap('belle')} jeune femme ${gap('intelligente')} et ${gap('gentille')}. <span class="word-bank">intelligent, beau, gentil</span>`,
`Comment s’appelle ce ${gap('petit')} garçon ${gap('sage')} ? <span class="word-bank">sage, petit</span>`,
`— Pourquoi Marie ne peut pas venir samedi ? Elle est ${gap('occupée')} ?<br>— Oui, elle dit qu’elle n’est pas ${gap('libre')} samedi.<br>— Et Michel ?<br>— Il est ${gap('fatigué')}. Il veut se reposer. <span class="word-bank">libre, occupé, fatigué</span>`,
`C’est un ${gap('petit')} exercice très ${gap('simple')}. <span class="word-bank">petit, simple</span>`,
`— Tu peux nous parler de ta ${gap('future')} femme ?<br>— Oh, c’est une femme ${gap('magnifique')}. Elle est ${gap('grande')} et ${gap('belle')}. Nous sommes très ${gap('heureux')} ensemble. <span class="word-bank">magnifique, futur, heureux, grand, beau</span>`,
`Ces dames sont toujours ${gap('fatiguées')} et ${gap('nerveuses')} ! <span class="word-bank">fatigué, nerveux</span>`,
`C’est une ${gap('nouvelle')} histoire ${gap('originale')}. <span class="word-bank">nouveau, original</span>`
])]},
{n:16,title:'Complétez avec les articles contractés.',page:144,parts:[
part('1','Excusez-moi, vous pouvez me donner l’adresse…',list([
`${gap('de l’')}Ambassade de France ?`,`${gap('du')} musée des Beaux-Arts ?`,`${gap('du')} restaurant « Entrecôte » ?`,`${gap('de l’')}Opéra ?`
])),
part('2','Je connais mal Paris. Vous pouvez me dire comment aller…',list([
`${gap('à la')} station de métro Concorde ?`,`${gap('au')} café de Flore ?`,`${gap('au')} jardin botanique ?`,`${gap('à l’')}Institut Français ?`
])),
part('3','Il faut combien de temps pour aller de… à… ?',list([
`${gap('de l’')}aéroport ${gap('au')} centre-ville (m) ?`,`${gap('de la')} banque ${gap('au')} salon de coiffure ?`,`${gap('du')} lycée ${gap('à la')} bibliothèque ?`,`${gap('du')} magasin ${gap('à l’')}hôpital ?`
]))]},
{n:17,title:'Écoutez le message et répondez aux questions.',page:145,parts:[audioNote,
`<div class="listening-choices"><fieldset><legend>1. La personne qui laisse le message est :</legend>${['Madame Legrand','la secrétaire de Monsieur Legrand','la secrétaire de Monsieur Bousquet'].map((text,i)=>`<label><input type="radio" name="listening-17-1" value="${i}"> ${text}</label>`).join('')}</fieldset><fieldset><legend>2. Pourquoi Monsieur Legrand ne peut pas venir au rendez-vous ?</legend>${['Il doit rester encore un jour à Paris.','Il doit rester encore deux jours à Marseille.','Il doit rester encore deux jours à Paris.'].map((text,i)=>`<label><input type="radio" name="listening-17-2" value="${i}"> ${text}</label>`).join('')}</fieldset><fieldset><legend>3. Le rendez-vous est possible :</legend>${['mercredi 27 mars à 17 heures','vendredi 27 mars à 16 heures','vendredi 26 mars à 17 heures'].map((text,i)=>`<label><input type="radio" name="listening-17-3" value="${i}"> ${text}</label>`).join('')}</fieldset></div>`
]},
{n:18,title:'Réserver une table.',page:145,parts:[
part('a','Écoutez et complétez le dialogue.',`${audioNote}<p class="hint">réserver — бронировать</p>${dialogue([
['Maître d’hôtel','« Café des artistes », bonjour.'],['Cliente',audioBlank],
['Maître d’hôtel','Oui, madame. À quelle heure ?'],['Cliente',audioBlank],
['Maître d’hôtel','Pour combien de personnes ?'],['Cliente',audioBlank],
['Maître d’hôtel','C’est à quel nom ?'],['Cliente',audioBlank],
['Maître d’hôtel','Pouvez-vous épeler, s’il vous plaît ?'],['Cliente',audioBlank],
['Maître d’hôtel','Très bien, c’est noté.'],['Cliente',audioBlank],
['Maître d’hôtel','Au revoir, madame. À demain.']
])}`),
part('b','Jouez la scène.',`${note('Vous voudriez déjeuner avec votre famille lundi 29 avril à 13 h 30. Vous téléphonez au restaurant « L’avenue » pour réserver une table.')}<span class="model-label">Пример диалога</span>${reveal('— Restaurant « L’avenue », bonjour.<br>— Bonjour, je voudrais réserver une table pour lundi 29 avril.<br>— À quelle heure ?<br>— À treize heures trente, s’il vous plaît.<br>— Pour combien de personnes ?<br>— Pour quatre personnes.<br>— C’est à quel nom ?<br>— Au nom de Martin : M-A-R-T-I-N.<br>— Très bien, c’est noté.<br>— Merci beaucoup. Au revoir !')}`)
]},
{n:19,title:'Traduisez.',page:145,parts:[
part('a','Les phrases.',pairs([
['Я так устала ! Дети постоянно хулиганят. Ты можешь мне помочь ?','Je suis si fatiguée ! Les enfants font tout le temps des bêtises. Tu peux m’aider ?'],
['Я плохо вижу. Какова сумма (somme, f) счёта ?','Je vois mal. Quelle est la somme de l’addition ?'],
['Что можно посмотреть в Москве ? — О, там можно посмотреть много прекрасных вещей. Но зимой там очень холодно. Нужно туда ехать летом.','Qu’est-ce qu’on peut voir à Moscou ? — Oh, on peut y voir beaucoup de belles choses. Mais en hiver, il y fait très froid. Il faut y aller en été.'],
['Я надеюсь, вы не очень заняты завтра ? Я хотел бы вас пригласить прогуляться.','J’espère que vous n’êtes pas très occupé demain. Je voudrais vous inviter à vous promener.'],
['Совсем рядом со старым лицеем строят новое здание.','Tout près du vieux lycée, on construit un nouveau bâtiment.'],
['Он слишком много говорит. И очень часто он говорит глупости.','Il parle trop. Et très souvent, il dit des bêtises.'],
['Вы возьмёте десерт ? — Да, мороженое для меня и яблочный пирог для малыша.','Vous allez prendre un dessert ? — Oui, une glace pour moi et une tarte aux pommes pour le petit.'],
['Ты слишком много работаешь и мало спишь. Ты очень устал. Тебе нужно отдохнуть.','Tu travailles trop et tu dors peu. Tu es très fatigué. Tu dois te reposer.'],
['В этом городе много машин и мало парковок. Есть большая парковка возле вокзала и небольшая парковка за мэрией. Этого слишком мало.','Dans cette ville, il y a beaucoup de voitures et peu de parkings. Il y a un grand parking près de la gare et un petit parking derrière la mairie. C’est trop peu.'],
['Фабрис, ты должен мне помочь. Я не знаю, где Клэр и как её найти. У тебя много друзей ? Может быть, кто-то знает эту красивую молодую женщину ?','Fabrice, tu dois m’aider. Je ne sais pas où est Claire ni comment la trouver. Tu as beaucoup d’amis ? Peut-être que quelqu’un connaît cette belle jeune femme ?'],
['Вы переводите английских писателей ? Сколько книг вы собираетесь перевести ?','Vous traduisez des écrivains anglais ? Combien de livres est-ce que vous allez traduire ?'],
['Сколько врачей работают в этой больнице ? — Это большая больница, но врачей недостаточно.','Combien de médecins travaillent dans cet hôpital ? — C’est un grand hôpital, mais il n’y a pas assez de médecins.']
])),
part('b','Les dialogues.',pairs([
['— Вы едете на море в июне ? Что вы там будете делать ?<br>— Мы будем купаться, гулять по пляжу, смотреть на людей (les gens). Там всегда много туристов: русских, немцев, итальянцев. Я люблю с ними разговаривать.<br>— Я знаю, что вы говорите по-немецки и по-итальянски, но разве вы говорите по-русски ?<br>— Я изучаю русский и знаю уже достаточно слов, чтобы разговаривать о простых вещах.',
'— Vous allez à la mer en juin ? Qu’est-ce que vous allez y faire ?<br>— Nous allons nous baigner, nous promener sur la plage et regarder les gens. Il y a toujours beaucoup de touristes là-bas : des Russes, des Allemands, des Italiens. J’aime parler avec eux.<br>— Je sais que vous parlez allemand et italien, mais est-ce que vous parlez russe ?<br>— J’apprends le russe et je connais déjà assez de mots pour parler de choses simples.'],
['— В вашем городе есть оперный театр ? Я обожаю оперу и хотел бы туда сходить.<br>— Я тоже люблю оперу, мы можем пойти туда вместе. Можно посмотреть программу: вот, есть отличный спектакль 4 марта. Я возьму билеты. Сколько билетов для вас ?<br>— Три билета. Я хотел бы пригласить приятеля и его сестру.',
'— Il y a un opéra dans votre ville ? J’adore l’opéra et je voudrais y aller.<br>— Moi aussi, j’aime l’opéra. Nous pouvons y aller ensemble. On peut regarder le programme : il y a un très bon spectacle le 4 mars. Je vais prendre les billets. Combien de billets voulez-vous ?<br>— Trois billets. Je voudrais inviter mon ami et sa sœur.'],
['— Какая у тебя мечта ?<br>— Я бы хотел поступить в университет, а после учёбы стать переводчиком. Я уже перевожу статьи, а иногда — встречи.<br>— Прекрасная идея ! Это очень интересная профессия.',
'— Quel est ton rêve ?<br>— Je voudrais entrer à l’université, puis devenir traducteur après mes études. Je traduis déjà des articles et je suis parfois interprète pendant des réunions.<br>— Excellente idée ! C’est un métier très intéressant.']
]))]}
];

const phonetics = `<details class="lesson-supplement" id="phonetics"><summary>Phonétique · упражнения в чтении <span>с. 130</span></summary><div class="supplement-body">${note('Аудиозапись не приложена. Здесь сохранены серии для самостоятельного чтения.')}${list([
'Повторите правило чтения «беглой e».<br><span lang="fr">Parlement, madeleine, bracelet, pâtisserie, tartelette, souvenir, événement, ornement, sonnerie, autrefois, saleté, marteler, parvenir, matelas, porcelaine, charcuterie, bibelot.</span>',
'Повторите правило чтения буквы i и сочетания i + l.<br><span lang="fr">Radieux, manière, vérifier, spécial, papier, miniature, siège, dossier, dialogue, piéton, mariage, vision, lumière, pièce, camion, rosier, rivière, adieu, seuil, gorille, appareil, meilleur, brillant, vitrail, taillé, réveil, ailleurs.</span>',
'Повторите правило чтения сочетания ti.<br><span lang="fr">Réaction, vocation, spatial, patience, gestion, inertie, modestie, punition, amnistie, initial.</span>',
'Повторите правило чтения буквы x.<br><span lang="fr">Réflexion, exclamer, exploser, exaspérer, excès, voix, fixe, excellent, excuse, doux, exemple, exercer, examiner, inexpressif, inexorable, exotique, exquis, maximal, vexer.</span>',
'Повторите правило чтения согласных.<br><span lang="fr">Tapis, bref, coup, pour, regard, chat, ticket, cours, truc, flanc, zèle, précis, bord, cas, part, trop, échec, bout, mur, chaud, cafard, confort, sujet, actif, drap, bijoux, cuir, signe, crise, luxe, bras, chair, motif, gorge, thon, nez, herbe, cage, choc, phoque, objectif, phare, soif.</span>',
'Повторите случаи обязательного связывания.<br><span lang="fr">Un arbre, des oranges, les exemples, mon amour, mes études, nos enfants, leurs élèves, neuf ans, dix-neuf heures, deux hommes, dix étages, six exercices, les beaux-arts, les vieux hôtels, les petites annonces, les grands amis, un grand homme, vingt articles, vingt et un, quand il veut, quand on sait, dans un magasin, dans une école, en automne, en août, très aimable, très heureux, nous attendons, ils y vont, il est avocat, elle est artiste, vous les admirez, il nous aime.</span>'
])}</div></details>`;

const dialogueQuestions = `<details class="lesson-supplement" id="dialogue-questions"><summary>Questions · вопросы к диалогам <span>с. 131–133</span></summary><div class="supplement-body"><p class="plain"><a class="source-reference" href="lecon-dix-pages.html#page-131">Открыть тексты диалогов в учебнике ↗</a></p>${part('','Dialogue 1. Questions.',pairs([
['Pourquoi est-ce que Claire est contente d’avoir une table près de la fenêtre ?','Parce qu’elle peut voir toute la Place des Lices.'],
['Est-ce que Claire et Marc peuvent se voir demain ?','Non, Claire ne peut pas. Elle a trop de travail cette semaine et peu de temps libre.'],
['Claire n’a pas beaucoup de temps pour se reposer mais elle dit que ce n’est pas grave, pourquoi ?','Parce qu’elle aime son travail et qu’elle adore ses élèves.'],
['Claire a combien d’élèves ?','Elle a quinze élèves.'],
['Quel projet fait Marc ?','Il va construire un nouveau bâtiment pour l’école.'],
['Comment est-ce que Claire peut l’aider dans son travail ?','Elle sait comment faire une bonne école pour les enfants et elle peut lui en parler.']
]))}${part('','Dialogue 2. Autour du texte.',pairs([
['Quels desserts prennent Claire et Marc ?',['Marc prend une tarte aux pommes.','Claire prend une glace au chocolat.']],
['Qu’est-ce qu’on peut voir à Rennes ?','On peut voir le Musée des Beaux-Arts et l’Opéra.'],
['Qu’est-ce que Claire et Marc vont faire samedi ?','Ils vont aller à la mer, se promener sur la plage et regarder la mer. Ils ne vont pas se baigner.']
]))}${part('','À vous !',pairs([
['Quels desserts préférez-vous ?','Je préfère la tarte aux pommes et la glace au chocolat.'],
['Est-ce que vous aimez aller à la plage quand il ne fait pas chaud ?','Oui, j’aime me promener sur la plage même quand il ne fait pas chaud.'],
['Est-ce que vous avez beaucoup de temps pour vous reposer ?','Non, je n’ai pas beaucoup de temps pour me reposer pendant la semaine.']
]))}</div></details>`;

const conversation = `<details class="lesson-supplement" id="conversation"><summary>Conversation · разыграйте диалоги <span>с. 146</span></summary><div class="supplement-body">${note('Jouez les scènes du dialogue entre Claire et Marc. Ниже — примеры реплик для тренировки.')}${pairs([
['Claire et Marc parlent du restaurant et des desserts qu’ils vont prendre.','— Tu voudrais un dessert, Claire ?<br>— Oui, je vais prendre une glace au chocolat. Et vous ?<br>— Je voudrais une tarte aux pommes et un café.<br>— C’est une bonne idée !'],
['Claire et Marc parlent de leur travail.','— Vous avez beaucoup de travail cette semaine ?<br>— Oui, j’ai trop de travail et peu de temps libre. Mais j’adore mes élèves.<br>— Moi, je vais construire un nouveau bâtiment pour votre école.<br>— Avec plaisir, je vais vous aider.'],
['Claire et Marc se donnent un rendez-vous.','— Quand est-ce que vous êtes libre ? Je voudrais vous revoir.<br>— Samedi, ça me va très bien !<br>— Nous pouvons aller à la mer et nous promener sur la plage.<br>— Oui, c’est une très bonne idée !']
])}</div></details>`;

const names = ['Réponses et questions','Demandez poliment','Verbes pronominaux','Dialogue audio','Ordre des mots','Adverbes','Adverbes et de','Traduisez les séries','Chez le médecin','Combien','Quel · quelle','Questions avec quel','Questions à un ami','Construire · traduire','Adjectifs','Articles contractés','Message audio','Réserver une table','Traduction'];
document.querySelector('#exercise-nav').innerHTML = exercises.map((exercise,index) => `<a href="#exercise-${exercise.n}"><span>${String(exercise.n).padStart(2,'0')}</span><span>${names[index]}</span></a>`).join('');
document.querySelector('#exercises').innerHTML = phonetics + dialogueQuestions + exercises.map(exercise => `<article class="exercise" id="exercise-${exercise.n}"><div class="exercise-head"><div class="number">${exercise.n}.</div><div class="exercise-heading"><h2>${exercise.title}</h2><a class="source-reference" href="lecon-dix-pages.html#page-${exercise.page}">Учебник · с. ${exercise.page} ↗</a></div></div><div class="exercise-body">${exercise.parts.join('')}</div></article>`).join('') + conversation;

const revealButtons = [...document.querySelectorAll('.gap,.reveal')];
function setShown(button, shown) { button.classList.toggle('shown',shown); button.setAttribute('aria-pressed',String(shown)); }
document.querySelector('#exercises').addEventListener('click', event => { const button = event.target.closest('.gap,.reveal'); if (button) setShown(button,!button.classList.contains('shown')); });
document.querySelector('#toggle-all').addEventListener('click', event => { const show = event.currentTarget.textContent.includes('Показать'); revealButtons.forEach(button => setShown(button,show)); event.currentTarget.textContent = show ? 'Скрыть все ответы' : 'Показать все ответы'; });
const seen = new Set();
const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { seen.add(entry.target.id); document.querySelector('#progress').textContent = `${seen.size} из ${exercises.length} упражнений`; document.querySelectorAll('#exercise-nav a').forEach(link => link.classList.toggle('current',link.getAttribute('href') === `#${entry.target.id}`)); } }); }, {rootMargin:'-20% 0px -65% 0px'});
document.querySelectorAll('.exercise[id^="exercise-"]').forEach(element => observer.observe(element));
const menu = document.querySelector('.sidebar'); const menuToggle = document.querySelector('#menu-toggle');
menuToggle.addEventListener('click', () => { const open = menu.classList.toggle('open'); menuToggle.setAttribute('aria-expanded',String(open)); });
function scrollToExercise(hash) {
  if (!/^#exercise-\d+$/.test(hash)) return;
  requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView({behavior:'instant',block:'start'}));
}
document.querySelectorAll('#exercise-nav a').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  menu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded','false');
  const hash = link.getAttribute('href');
  history.pushState(null,'',hash);
  scrollToExercise(hash);
}));
window.addEventListener('hashchange', () => scrollToExercise(location.hash));
window.addEventListener('load', () => scrollToExercise(location.hash), {once:true});
