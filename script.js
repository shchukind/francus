const g = (answer, label = 'Открыть пропуск') => `<button class="gap" type="button" aria-label="${label}" aria-pressed="false">${answer}</button>`;
const r = answer => `<button class="reveal" type="button" aria-label="Показать пример ответа" aria-pressed="false">${answer}</button>`;
const list = items => `<ol class="items">${items.map(item => `<li>${item}</li>`).join('')}</ol>`;
const questions = pairs => `<div class="questions">${pairs.map(([q,a]) => `<div class="question"><div class="question-text">${q}</div><span class="model-label">Пример ответа</span>${r(a)}</div>`).join('')}</div>`;
const part = (letter, title, body, hint='') => `<section class="part"><h3><span class="letter">${letter})</span>${title}</h3>${hint ? `<p class="hint">${hint}</p>` : ''}${body}</section>`;
const numberSeries = [
  ['22 élèves','vingt-deux élèves'],['32 places','trente-deux places'],['43 ans','quarante-trois ans'],
  ['53 pages','cinquante-trois pages'],['14 euros','quatorze euros'],['6 chansons','six chansons'],
  ['26 étudiants','vingt-six étudiants'],['18 employés','dix-huit employés'],['8 valises','huit valises'],
  ['69 ans','soixante-neuf ans'],['19 heures','dix-neuf heures'],['29 acteurs','vingt-neuf acteurs'],
  ['49 professeurs','quarante-neuf professeurs'],['10 jours','dix jours'],['10 architectes','dix architectes'],
  ['15 banques','quinze banques'],['20 étages','vingt étages'],['20 maisons','vingt maisons'],
  ['16 vendeurs','seize vendeurs'],['21 heures','vingt et une heures'],['21 ans','vingt et un ans'],
  ['55 voitures','cinquante-cinq voitures'],['47 enfants','quarante-sept enfants'],['13 sacs','treize sacs']
];
const translationPhrases = [
  ['все наши врачи','tous nos médecins'],['все их вещи','toutes leurs affaires'],
  ['все эти праздники','toutes ces fêtes'],['все возможные идеи','toutes les idées possibles'],
  ['все французские актеры','tous les acteurs français'],['все хорошие преподаватели','tous les bons professeurs'],
  ['все важные документы','tous les documents importants'],['все время','tout le temps'],
  ['вся неделя','toute la semaine'],['вся их работа','tout leur travail'],
  ['все ваши родители','tous vos parents'],['весь наш город','toute notre ville'],
  ['все простые проекты','tous les projets simples'],['все маленькие дети','tous les petits enfants'],
  ['все счастливые женщины','toutes les femmes heureuses'],['все его новые песни','toutes ses nouvelles chansons']
];

const exercises = [
  {n:1,title:'Les nombres.',parts:[
    part('a','Lisez les séries. Faites attention à la prononciation !',`<div class="series-grid">${numberSeries.map(([digits,words])=>`<div class="series-item"><span>${digits}</span>${r(words)}</div>`).join('')}</div>`),
    part('b','Répondez aux questions.',questions([
      ['À quel âge les petits commencent à marcher (ходить) ?','Ils commencent à marcher vers un an.'],
      ['À quel âge les enfants apprennent à lire ? à écrire ?','Ils apprennent à lire et à écrire vers six ans.'],
      ['À quel âge faut-il commencer à apprendre une langue ?','Il faut commencer le plus tôt possible.'],
      ['Quel est l’âge idéal pour commencer les études à l’université ?','Vers dix-huit ans.'],
      ['À quel âge faut-il quitter ses parents ? commencer à travailler ?','On peut quitter ses parents et commencer à travailler vers vingt ans.'],
      ['À quel âge peut-on sortir le soir, aller en discothèque ?','On peut sortir le soir vers seize ou dix-huit ans.'],
      ['Quel est l’âge idéal pour avoir un enfant ?','Il n’y a pas d’âge idéal ; cela dépend de la personne.']
    ]))
  ]},
  {n:2,title:'Professions et nationalités.',parts:[
    part('a','Quelle est leur profession ? Devinez (угадайте) !',list([
      `Il joue dans des films. Il est ${g('acteur')}.`,
      `Elle étudie à l’université. Elle est ${g('étudiante')}.`,
      `On peut voir ses tableaux dans une galerie. Il est ${g('peintre')}.`,
      `Ils écrivent des romans. Ils sont ${g('écrivains')}.`,
      `Ils dessinent des maisons et des appartements sur le plan. Ils sont ${g('architectes')}.`,
      `Il aime faire la cuisine et il travaille dans un restaurant. Il est ${g('cuisinier')}.`,
      `Elle écrit des articles et fait des reportages. Elle travaille comme ${g('journaliste')}.`,
      `Il connaît l’informatique et il travaille sur un ordinateur. Il est ${g('informaticien')}.`
    ])),
    part('b','Quelle est leur nationalité ?',list([
      `Alex et Eva habitent à Berlin. Il est ${g('allemand')}, elle est ${g('allemande')}. Ils parlent ${g('allemand')}.`,
      `James et Kate habitent à New-York. Il est ${g('américain')}, elle est ${g('américaine')}. Ils parlent ${g('anglais')}.`,
      `Carlo et Daniela habitent à Rome. Il est ${g('italien')}, elle est ${g('italienne')}. Ils parlent ${g('italien')}.`,
      `José et Maria habitent à Madrid. Il est ${g('espagnol')}, elle est ${g('espagnole')}. Ils parlent ${g('espagnol')}.`
    ]))
  ]},
  {n:3,title:'Mettez un article si nécessaire ou la préposition de.',parts:[
    `<p class="notice">В некоторых местах возможны варианты в зависимости от смысла. Здесь показан один грамматически верный вариант.</p>${list([
      `Sur le bureau ${g('du')} directeur il y a ${g('un')} ordinateur (m), ${g('un')} agenda (m), ${g('des')} papiers.`,
      `Près ${g('du')} lycée il n’y a pas ${g('de')} parc mais il y a ${g('un')} grand terrain de sport.`,
      `Monsieur Moreau est ${g('—')} médecin, il travaille à ${g('l’')}hôpital. C’est ${g('un')} médecin très compétent. Et puis, c’est ${g('un')} homme très sympathique. Il aime ${g('les')} enfants et il est gentil avec eux.`,
      `Tu veux être ${g('—')} journaliste ? Tu veux travailler à ${g('la')} radio ou à ${g('la')} télé ? – Je veux travailler dans ${g('un')} journal. C’est ${g('un')} travail très intéressant.`,
      `Le guide dit aux touristes : « Dans ${g('un')} atelier de ${g('un')} peintre vous pouvez voir ${g('des')} portraits et ${g('des')} gravures. Il y a aussi ${g('un')} tableau qui représente ${g('une')} belle maison. Derrière ${g('la')} maison il y a ${g('un')} grand jardin, et dans ${g('le')} jardin vous pouvez voir ${g('une')} petite fille qui joue à ${g('un')} ballon ».`,
      `${g('Les')} élèves de cette école apprennent ${g('l’')}anglais et ${g('l’')}espagnol.`,
      `En Russie, ${g('les')} études à ${g('l’')}université durent (длятся) 4 ans. ${g('Les')} étudiants ont ${g('des')} cours tous ${g('les')} jours, même (даже) ${g('le')} samedi.`,
      `Je n’aime pas ${g('l’')}hiver. Je préfère ${g('le')} printemps. Pour moi c’est ${g('une')} très belle saison.`,
      `Je veux prendre ${g('un')} bon petit-déjeuner pour être en ${g('pleine')} forme toute ${g('la')} journée. Souvent, je n’ai pas le temps d’aller à ${g('la')} cantine pour déjeuner. Je prends ${g('un')} petit café avec ${g('un')} sandwich et c’est tout. « Écoute, ce n’est pas sérieux ! ${g('Un')} sandwich, ce n’est pas bon pour la santé (здоровье). »`,
      `Vous prenez ${g('le')} métro pour aller à ${g('votre')} bureau ? Vous n’avez pas ${g('de')} voiture ? – J’ai ${g('une')} voiture, mais ${g('le')} matin, la circulation est difficile. Je préfère ${g('le')} métro.`
    ])}`
  ]},
  {n:4,title:'Être ou avoir ? Complétez le dialogue.',parts:[
    `<p class="plain">– Vous ${g('avez')} quel âge ?<br>– Je ${g('ai')} 22 ans.<br>– Vous ${g('avez')} une formation ? Vous ${g('avez')} un diplôme ?<br>– Non, pas encore (не еще). Je ${g('suis')} étudiant.<br>– Vous ${g('êtes')} anglais ? Vous ${g('avez')} un accent anglais.<br>– Je ${g('suis')} bilingue. Ma mère ${g('est')} anglaise, mon père ${g('est')} français. Nous parlons anglais à la maison. On dit que je ${g('ai')} un accent anglais.<br>– Oui, ce ${g('est')} un petit accent ! Vous ${g('avez')} des frères ou des sœurs ?<br>– Non, je n’${g('ai')} pas de frère ni de sœur, je ${g('suis')} fils unique dans ma famille.</p>`
  ]},
  {n:5,title:'Vouloir · pouvoir · devoir',parts:[
    part('a','Mettez les verbes à la bonne forme.',list([
      `Vous (vouloir) ${g('voulez')} un thé ? – Oui, je ${g('veux')} bien, merci !`,
      `Ils ne (pouvoir) ${g('peuvent')} pas venir ? Pourquoi ? – Ils sont très occupés. Ils (devoir) ${g('doivent')} travailler.`,
      `Est-ce que le chef (pouvoir) ${g('peut')} signer les papiers ? – Oui, il ${g('peut')}, mais il ne (vouloir) ${g('veut')} pas !`,
      `Vous ne (devoir) ${g('devez')} pas courir ici !`,
      `Qu’est-ce que les enfants (vouloir) ${g('veulent')} faire cet après-midi ? Nous (pouvoir) ${g('pouvons')} aller à la piscine !`
    ])),
    part('b','Répondez aux questions.',questions([
      ['Quelle langue est-ce que vous voulez apprendre ?','Je veux apprendre le français.'],
      ['Quelle ville est-ce que vous voulez visiter ?','Je veux visiter Paris.'],
      ['Qu’est-ce que vous devez faire ce soir ?','Je dois faire mes devoirs.'],
      ['Est-ce que vous pouvez rester toute la journée à la maison ?','Oui, je peux rester toute la journée à la maison.']
    ]))
  ]},
  {n:6,title:'Dire · parler. Complétez le dialogue.',parts:[
    `<p class="plain">– Tu peux ${g('dire')} à tes parents que tu veux venir avec moi à Londres ?<br>– Non, je ne peux pas ${g('dire')} ça à mes parents. Je ne ${g('parle')} pas avec eux !<br>– Qu’est-ce qu’il y a ? Pourquoi tu ne ${g('parles')} pas avec eux ?<br>– Parce qu’ils ne me comprennent pas ! Ils ${g('parlent')} toujours de mes études ! Ils ${g('disent')} que je suis un mauvais étudiant.<br>– Qu’est-ce qu’ils ${g('disent')} encore (еще) ?<br>– Ils ${g('disent')} que je dois rester à la maison et travailler ! Et puis, ils ${g('parlent')} toujours de mon cousin ! Ils ${g('disent')} qu’il est sérieux, qu’il a toujours de bons résultats et qu’il ${g('parle')} déjà anglais ! Et moi, je ne ${g('parle')} pas anglais...<br>– Mais alors, tu ${g('dis')} à tes parents que tu veux aller à Londres pour perfectionner ton anglais ! C’est logique, non ?<br>– C’est une bonne idée ! Si je ${g('dis')} à mes parents que c’est un voyage pour les études, ils peuvent ${g('dire')} oui.</p>${questions([['Et vous, est-ce que vous parlez à vos parents de vos études ? Qu’est-ce que vous dites à vos parents ? Et eux, qu’est-ce qu’ils disent ?','Oui, je parle à mes parents de mes études. Je leur dis que j’apprends le français. Ils disent que c’est intéressant.']])}`
  ]},
  {n:7,title:'Aller · partir · venir · revenir.',parts:[
    part('a','Mettez les verbes à la bonne forme.',list([
      `– Nous ${g('allons')} à Bayonne. Vous ${g('venez')} avec nous ?<br>– Oui, avec plaisir ! Vous ${g('partez')} quand ?<br>– Nous ${g('partons')} vendredi soir. Nous prenons le train de 19 heures.`,
      `Ils ${g('viennent')} souvent chez nous pour le dîner.`,
      `À quelle heure est-ce que vous ${g('revenez')} de l’université ? – Je ${g('reviens')} toujours à 16 heures.`,
      `Ils ${g('vont')} à la bibliothèque et ils ${g('reviennent')} à la maison à 17 heures.`,
      `À quelle heure faut-il ${g('partir')} de la maison pour être à la gare à 13h30 ?`,
      `Tu ${g('vas')} au supermarché ou tu ${g('reviens')} du supermarché ?`
    ])),
    part('b','Répondez aux questions.',questions([
      ['De quelle ville venez-vous ?','Je viens de Moscou.'],
      ['Est-ce que vous partez souvent en voyage ? Où allez-vous ? À la mer ? Dans une ville ?','Oui, je pars parfois en voyage. Je vais à la mer.'],
      ['Est-ce que vos amis viennent souvent chez vous ?','Oui, mes amis viennent souvent chez moi.'],
      ['À quelle heure vous revenez de l’université / du bureau ?','Je reviens du bureau à dix-huit heures.']
    ]))
  ]},
  {n:8,title:'Mettez les verbes à la bonne forme.',parts:[
    list([
      `– Qu’est-ce que tu (faire) ${g('fais')} cet après-midi ? On (pouvoir) ${g('peut')} prendre un café ?<br>– Je (être) ${g('suis')} désolé. Aujourd’hui je (être) ${g('suis')} occupé. Je (aller) ${g('vais')} voir ma sœur.`,
      `Ils ne (comprendre) ${g('comprennent')} pas cet exercice.`,
      `Vous (prendre) ${g('prenez')} le train ensemble ?`,
      `Je (prendre) ${g('prends')} un dessert.`,
      `Les élèves (apprendre) ${g('apprennent')} des chansons anglaises.`,
      `Qu’est-ce que vous (dire) ${g('dites')} ? Vous ne (comprendre) ${g('comprenez')} pas ce poème ?`,
      `Vous (faire) ${g('faites')} souvent des voyages en France ?`,
      `Les étudiants ne (connaître) ${g('connaissent')} pas ce peintre italien.`,
      `Vous (connaître) ${g('connaissez')} cet écrivain ? – Oui, bien sûr, je ${g('connais')} cet écrivain américain.`,
      `Ils (avoir) ${g('ont')} quelle voiture ? – Ils ${g('ont')} une Peugeot.`,
      `Vous (voir) ${g('voyez')} souvent vos parents ? – Je ${g('vois')} mes parents tous les jours.`,
      `Nous (être) ${g('sommes')} fatigués et nous (avoir) ${g('avons')} faim.`,
      `Tu ne (dormir) ${g('dors')} pas ? Tu (lire) ${g('lis')} ?`,
      `Les petits (dormir) ${g('dorment')} déjà. Il (être) ${g('est')} 23 heures.`,
      `Vous (écrire) ${g('écrivez')} des lettres ou des mails à vos amis ? – Je (écrire) ${g('écris')} des sms.`
    ])
  ]},
  {n:9,title:'Mettez le pronom qui convient.',parts:[
    list([
      `Je m’appelle Serge, et ${g('toi')} ?<br>– ${g('Moi')}, je m’appelle Georges.`,
      `Vous allez bien ? – Oui, ${g('je')} vais bien, et ${g('vous')} ? – Ça va, merci !`,
      `Je n’aime pas ce photographe ! Je ne veux pas travailler avec ${g('lui')}.`,
      `Vous déjeunez chez ${g('vous')} ou à la cantine ? – Je préfère déjeuner chez ${g('moi')}.`,
      `Qui connaît cet écrivain ? – ${g('Moi')} ! Je connais bien la littérature italienne.`,
      `Aujourd’hui les enfants sont très sages. L’institutrice est contente d’${g('eux')}.`,
      `« Les filles sont toujours capricieuses ! Je ne veux pas jouer avec ${g('elles')} ! » – dit Sébastien.`,
      `Qui chante si bien ? C’est Marine ? – Oui, c’est ${g('elle')}.`,
      `Tu ne peux pas rester chez ${g('moi')} toute la journée ! Tes copains sont déjà dans la cour. Tu ne veux pas jouer avec ${g('eux')} ?`,
      `Tu connais les fils de Mme Bernard ? – Oui, ${g('ils')} sont très gentils. Elle n’a pas de problèmes avec ${g('eux')}.`,
      `Je veux partir en week-end à Manosque. Tu viens avec ${g('moi')} ? – ${g('Moi')} aussi, je veux aller à Manosque, mais ce week-end ce n’est pas possible.`
    ])
  ]},
  {n:10,title:'Tout + article · Traduisez.',parts:[
    part('a','Mettez « tout + article » à la bonne forme.',`<ol class="items inline-list">${[
      ['tous les','voyageurs'],['toute la','maison'],['toutes les','villes'],['toute la','cantine'],['toutes les','réunions'],['tout l’','hôpital'],['tous les','copains'],['toutes les','chansons'],['tous les','billets'],['toute la','classe']
    ].map(([a,b])=>`<li>${g(a)} ${b}</li>`).join('')}</ol>`),
    part('b','Traduisez.',`<ol class="items translation-items">${translationPhrases.map(([source,answer])=>`<li><span class="translation-source">${source}</span>${r(answer)}</li>`).join('')}</ol>`)
  ]},
  {n:11,title:'Prépositions et articles.',parts:[
    part('a','Mettez une préposition si nécessaire ou un article contracté.',list([
      `Qu’est-ce que vous faites ${g('dans')} la vie ? – Je travaille ${g('comme')} vendeur ${g('dans')} un magasin.`,
      `Vous habitez ${g('loin de')} l’université ? Vous y allez ${g('à')} pied ? – Non, je dois prendre le bus.`,
      `Le dîner est déjà prêt ! ${g('À')} table !`,
      `Qu’est-ce qu’il y a ${g('près de')} la gare ? – Il y a un parking.`,
      `Le petit dort déjà ${g('dans')} son lit.`,
      `Anne, j’ai une surprise ${g('pour')} toi ! – Merci, Pierre. C’est gentil.`,
      `Il reste toute la journée ${g('à')} la maison et regarde ${g('—')} la télé. Ce n’est pas normal. ${g('À')} son âge il doit courir et jouer ${g('au')} football !`,
      `Vous allez parfois ${g('à')} la piscine ? – Oui, j’y vais ${g('avec')} mes copains.`,
      `Qu’est-ce que tu as ? Tu n’es pas malade (болен) ? Tu dois aller ${g('à')} la clinique ! – Non, ce n’est pas grave. Je ne veux pas aller ${g('chez')} le médecin. Et puis, on est ${g('—')} samedi ! Le médecin n’est pas là.`,
      `Quand est-ce que vous partez en vacances ? ${g('Au')} printemps ou ${g('en')} été ? – Je pars en vacances ${g('en')} automne.`,
      `Excusez-moi, le musée est ${g('loin de')} l’hôtel ? – Oui, il faut prendre le métro.`,
      `${g('Sur')} la place ${g('de')} la mairie il y a un monument.`,
      `Vous connaissez la météo ${g('de')} demain ?`
    ]),'(avec, dans, sur, derrière, près de, loin de, à, chez, en, pour, comme)'),
    part('b','Regardez l’image. Dites ce que vous voyez sur l’image.',`<div class="visual-map"><img src="map-page.png" alt="Схема города из упражнения: вокзал, торговый центр, университет, лицей, собор, музей, кафе, библиотека, почта и памятник"></div>${questions([['Décrivez la ville avec les prépositions proposées.','La gare est près de la poste. Le lycée est à côté de l’université. La bibliothèque est loin de la gare. Le monument est devant la cathédrale.']])}`,'(dans, sur, derrière, près de, à)')
  ]},
  {n:12,title:'Lisez le poème. Traduisez.',parts:[
    `<div class="poem"><strong>Dans Paris</strong><br>Dans Paris il y a une rue,<br>dans cette rue il y a une maison,<br>dans cette maison il y a un escalier,<br>dans cet escalier il y a une chambre,<br>dans cette chambre il y a une table,<br>sur cette table il y a un tapis,<br>sur ce tapis il y a une cage,<br>dans cette cage il y a un nid,<br>dans ce nid il y a un œuf,<br>dans cet œuf il y a un oiseau...</div><p class="source-note">Paul Éluard · Les sentiers et les routes de la poésie</p><span class="model-label">Пример перевода</span>${r('В Париже есть улица, на этой улице есть дом, в этом доме есть лестница, на этой лестнице есть комната, в этой комнате есть стол, на этом столе есть ковёр, на этом ковре есть клетка, в этой клетке есть гнездо, в этом гнезде есть яйцо, в этом яйце есть птица…')}<p class="plain strong-line" style="margin-top:24px">Faites un petit poème de 8–10 lignes en imitant le poème de Paul Éluard.</p><span class="model-label">Пример стихотворения</span>${r('Dans ma ville il y a une rue,<br>dans cette rue il y a un jardin,<br>dans ce jardin il y a un arbre,<br>sur cet arbre il y a une branche,<br>sur cette branche il y a un oiseau,<br>cet oiseau chante une chanson,<br>dans cette chanson il y a un rêve,<br>et dans ce rêve il y a Paris.')}`
  ]},
  {n:13,title:'Un touriste français en Russie.',instruction:'Imaginez un touriste français qui veut venir en Russie. Répondez à ses questions en utilisant le pronom on.',parts:[
    questions([
      ['Est-ce qu’on doit faire un visa pour venir en Russie ?','Oui, en général, on doit obtenir un visa pour venir en Russie. Les règles dépendent de la nationalité.'],
      ['Est-ce qu’on doit connaître le russe pour faire un voyage en Russie ? Ou on peut parler anglais ?','On n’est pas obligé de connaître le russe, mais cela aide. Dans les grandes villes, on peut parfois parler anglais.'],
      ['Quelles villes doit-on visiter pour connaître le pays ?','On peut visiter Moscou et Saint-Pétersbourg.'],
      ['Qu’est-ce qu’on peut voir à Moscou ?','On peut voir la place Rouge et les musées.'],
      ['Est-ce qu’on peut prendre des photos dans les musées de Moscou ?','On peut prendre des photos dans certains musées ; il faut vérifier les règles sur place.'],
      ['Est-ce qu’on peut voir le centre de la ville à pied ? Ou on doit prendre le bus, le métro ?','On peut voir une partie du centre à pied, mais on peut aussi prendre le métro.'],
      ['Est-ce qu’on comprend le plan du métro si on ne parle pas russe ?','Oui, on peut généralement comprendre le plan du métro.'],
      ['Est-ce qu’on doit prendre des vêtements (одежда) chauds en été ? Quel temps fait-il ?','En été, il fait souvent bon, mais on peut prendre une veste pour les jours frais.']
    ])
  ]},
  {n:14,title:'Écoutez le dialogue et répondez aux questions.',parts:[
    `<p class="plain">en pleine forme — в полном порядке<br>nouvelle, f — новость<br>bon voyage ! — счастливого пути !</p><div class="notice">Аудиозапись диалога не была приложена. Вопросы сохранены, но достоверные ответы появятся, когда будет исходный диалог.</div>${list([
      'Est-ce que Brigitte est contente de voir Élodie ? Qu’est-ce qu’elle dit ?',
      'Comment vont les enfants de Brigitte ?',
      'Quel âge a Xavier ? Qu’est-ce qu’il fait ? Qu’est-ce qu’il aime ?',
      'Quel âge a Hélène ? Qu’est-ce qu’elle fait dans la vie ? Qu’est-ce qu’elle apprend ?',
      'Où travaille Élodie ? Est-ce qu’elle travaille beaucoup (много) ?',
      'Qu’est-ce qu’Élodie fait demain ? Quel est son projet ?',
      'Quand est-ce qu’Élodie revient ?',
      'Qu’est-ce que Brigitte et Élodie peuvent faire dimanche ?',
      'À quelle heure Élodie vient dimanche ?'
    ])}`
  ]},
  {n:15,title:'Traduisez.',parts:[
    questions([
      ['Что ты хочешь делать после университета? У тебя уже есть идея? – Да, я могу начать работать. Я хочу работать журналистом на радио.','Qu’est-ce que tu veux faire après l’université ? Tu as déjà une idée ? – Oui, je peux commencer à travailler. Je veux travailler comme journaliste à la radio.'],
      ['Чем она занимается? Она домохозяйка, но она не сидит всё время дома. Утром она идет с детьми в школу, потом идет в магазин, а днем идет забирать детей из школы. Она занята весь день. Иногда, по вечерам, она выходит куда-то с подругами: в театр, на концерт, в музей.','Qu’est-ce qu’elle fait dans la vie ? Elle est femme au foyer, mais elle ne reste pas tout le temps à la maison. Le matin, elle accompagne les enfants à l’école, puis elle va au magasin et l’après-midi, elle va chercher les enfants à l’école. Elle est occupée toute la journée. Parfois, le soir, elle sort avec ses amies : au théâtre, à un concert ou au musée.'],
      ['Они возвращаются с собрания в 16.30.','Ils reviennent de la réunion à 16 h 30.'],
      ['Мы пойдем в итальянский ресторан в субботу вечером. Ты хочешь пойти с нами? – Мне очень жаль, но в субботу вечером мой папа идет в кино смотреть новый фильм Вуди Аллена, и я иду туда с ним.','Nous allons au restaurant italien samedi soir. Tu veux venir avec nous ? – Je suis désolé, mais samedi soir, mon père va au cinéma voir le nouveau film de Woody Allen et j’y vais avec lui.'],
      ['Видно, что в этой школе очень хорошая учительница. Все ученики вежливые, говорят «здравствуйте, до свидания, приятного аппетита».','On voit qu’il y a une très bonne institutrice dans cette école. Tous les élèves sont polis et disent « bonjour », « au revoir », « bon appétit ».'],
      ['Рядом с офисом есть кафе? – Нет, там нет кафе. Но в офисе есть столовая. Там можно пообедать.','Est-ce qu’il y a un café près du bureau ? – Non, il n’y a pas de café là-bas. Mais il y a une cantine au bureau. On peut y déjeuner.'],
      ['Вы писатель? – Да, верно. – Что вы пишете: романы, новеллы? Вы можете рассказать о своих книгах?','Vous êtes écrivain ? – Oui, c’est vrai. – Qu’est-ce que vous écrivez : des romans, des nouvelles ? Vous pouvez parler de vos livres ?'],
      ['Дочь Луизы такая умная! Она уже знает цифры и учится считать. А ещё она понимает родителей Луизы, когда они говорят по-немецки и поют немецкие песни. Она поёт вместе с ними!','La fille de Louise est si intelligente ! Elle connaît déjà les chiffres et apprend à compter. Elle comprend aussi les parents de Louise quand ils parlent allemand et chantent des chansons allemandes. Elle chante avec eux !'],
      ['Летом все хотят поехать на пляж. Погода хорошая, жарко. Часто бывает +30! Вода теплая!','En été, tout le monde veut aller à la plage. Il fait beau et chaud. Il fait souvent 30 degrés ! L’eau est chaude !'],
      ['Что с тобой? Ты не слушаешь отца! В чем дело? – Он говорит, что я должен уже быть в кровати и спать! Но я не устал! – Уже 10 часов. Все дети должны спать!','Qu’est-ce que tu as ? Tu n’écoutes pas ton père ! Qu’est-ce qu’il y a ? – Il dit que je dois déjà être au lit et dormir ! Mais je ne suis pas fatigué ! – Il est déjà dix heures. Tous les enfants doivent dormir !']
    ])
  ]}
];

const names = ['Les nombres','Professions','Articles et de','Être ou avoir','Vouloir · pouvoir · devoir','Dire · parler','Aller · partir · venir','Formes des verbes','Pronoms','Tout + article','Prépositions','Poème','Touriste en Russie','Dialogue audio','Traduction'];
document.querySelector('#exercise-nav').innerHTML = exercises.map((e,i)=>`<a href="#exercise-${e.n}"><span>${String(e.n).padStart(2,'0')}</span><span>${names[i]}</span></a>`).join('');
document.querySelector('#exercises').innerHTML = exercises.map(e=>`<article class="exercise" id="exercise-${e.n}"><div class="exercise-head"><div class="number">${e.n}.</div><div class="exercise-heading"><h2>${e.title}</h2>${e.instruction ? `<p class="instruction">${e.instruction}</p>` : ''}</div></div><div class="exercise-body">${e.parts.join('')}</div></article>`).join('');

const revealButtons = [...document.querySelectorAll('.gap,.reveal')];
function setShown(button, shown){button.classList.toggle('shown',shown);button.setAttribute('aria-pressed',String(shown));}
document.querySelector('#exercises').addEventListener('click',e=>{const b=e.target.closest('.gap,.reveal');if(b)setShown(b,!b.classList.contains('shown'));});
document.querySelector('#toggle-all').addEventListener('click',e=>{const show=e.currentTarget.textContent.includes('Показать');revealButtons.forEach(b=>setShown(b,show));e.currentTarget.textContent=show?'Скрыть все ответы':'Показать все ответы';});
const seen = new Set();const observer = new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){seen.add(entry.target.id);document.querySelector('#progress').textContent=`${seen.size} из 15 упражнений`;document.querySelectorAll('#exercise-nav a').forEach(a=>a.classList.toggle('current',a.getAttribute('href')===`#${entry.target.id}`));}})},{rootMargin:'-20% 0px -65% 0px'});document.querySelectorAll('.exercise').forEach(el=>observer.observe(el));
const menu=document.querySelector('.sidebar');const menuToggle=document.querySelector('#menu-toggle');menuToggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});document.querySelectorAll('#exercise-nav a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}));
