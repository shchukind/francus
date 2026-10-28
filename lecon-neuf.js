const gap = answer => `<button class="gap" type="button" aria-label="Открыть пропуск" aria-pressed="false">${answer}</button>`;
const reveal = answer => `<button class="reveal" type="button" aria-label="Показать пример ответа" aria-pressed="false">${answer}</button>`;
const list = items => `<ol class="items">${items.map(item => `<li>${item}</li>`).join('')}</ol>`;
const pairs = (items,start=1) => `<ol class="items answer-pairs" start="${start}">${items.map(([question,answer]) => `<li>${question}${Array.isArray(answer) ? answer.map(reveal).join('') : reveal(answer)}</li>`).join('')}</ol>`;
const part = (letter,title,body,hint='') => `<section class="part"><h3>${letter ? `<span class="letter">${letter})</span>` : ''}${title}</h3>${hint ? `<p class="hint">${hint}</p>` : ''}${body}</section>`;
const note = text => `<p class="notice">${text}</p>`;
const dateAnswer = new Intl.DateTimeFormat('fr-FR',{day:'numeric',month:'long',year:'numeric'}).format(new Date());

const dates = [
  ['08/03','le huit mars'],['11/04','le onze avril'],['05/02','le cinq février'],
  ['01/01','le premier janvier'],['20/11','le vingt novembre'],['24/08','le vingt-quatre août'],
  ['02/05','le deux mai'],['19/10','le dix-neuf octobre'],['16/07','le seize juillet'],
  ['21/06','le vingt et un juin'],['17/05','le dix-sept mai'],['13/12','le treize décembre']
];
const agenda = [
  ['Lundi 21', [['8 h – 10 h','courses'],['10 h – 11 h','ménage']], 'Lundi matin, Mme Cervais va faire ses courses, puis elle va faire le ménage.'],
  ['Mardi 22', [['9 h','rendez-vous avec sa cousine Hélène, promenade au Jardin du Luxembourg'],['13 h','déjeuner avec Hélène au restaurant « La Terrasse »']], 'Mardi, elle va retrouver sa cousine Hélène à neuf heures et se promener au Jardin du Luxembourg. À treize heures, elles vont déjeuner à « La Terrasse ».'],
  ['Mercredi 23', [['10 h 15','médecin'],['12 h','journal de midi à la radio RTL']], 'Mercredi, elle va aller chez le médecin à dix heures quinze, puis elle va écouter le journal de midi sur RTL.'],
  ['Jeudi 24', [['15 h','Musée d’Orsay'],['19 h','La Comédie-Française']], 'Jeudi, elle va visiter le Musée d’Orsay à quinze heures et aller à la Comédie-Française à dix-neuf heures.'],
  ['Vendredi 25', [['11 h','promenade au parc Monceau'],['16 h 30','cours de cuisine']], 'Vendredi, elle va se promener au parc Monceau à onze heures et suivre un cours de cuisine à seize heures trente.'],
  ['Samedi 26', [['14 h','FNAC : trouver un cadeau pour Mme Biset'],['18 h','anniversaire de Mme Biset']], 'Samedi, elle va aller à la FNAC pour trouver un cadeau, puis aller à l’anniversaire de Mme Biset à dix-huit heures.'],
  ['Dimanche 27', [['journée','à la maison : livre, lettre à sa sœur, appeler Marc, tarte au citron'],['17 h','thé avec Françoise']], 'Dimanche, elle va rester à la maison, lire, écrire à sa sœur, appeler Marc et préparer une tarte au citron. À dix-sept heures, elle va prendre le thé avec Françoise.']
];
const agendaHtml = `<div class="agenda">${agenda.map(([day,rows,answer]) => `<div class="agenda-day"><div class="agenda-day-head">${day}</div>${rows.map(([time,task])=>`<div class="agenda-row"><span class="agenda-time">${time}</span><span>${task}</span></div>`).join('')}<div class="agenda-answer"><span class="model-label">Пример рассказа</span>${reveal(answer)}</div></div>`).join('')}</div>`;

const translationFive = [
  [
    ['я их не знаю','Je ne les connais pas.'],['они нас ждут','Ils nous attendent.'],['я тебя ищу','Je te cherche.'],['они вас не любят','Ils ne vous aiment pas.'],['он нас приглашает','Il nous invite.'],['вы его знаете','Vous le connaissez.'],['я его беру','Je le prends.'],['мы вас не понимаем','Nous ne vous comprenons pas.'],['он на меня смотрит','Il me regarde.'],['я её ставлю','Je la mets.']
  ],
  [
    ['мы не можем его найти','Nous ne pouvons pas le trouver.'],['нужно их выучить','Il faut les apprendre.'],['я хочу вас пригласить','Je veux vous inviter.'],['я должна его надеть','Je dois le mettre.']
  ],
  [
    ['ты меня понимаешь?','Tu me comprends ?'],['вы меня слушаете?','Vous m’écoutez ?'],['ты её видишь?','Tu la vois ?'],['они вас знают?','Ils vous connaissent ?']
  ],
  [
    ['я не хочу её потерять','Je ne veux pas la perdre.'],['вы меня не знаете','Vous ne me connaissez pas.'],['он нас не слушает','Il ne nous écoute pas.'],['она не хочет тебя видеть','Elle ne veut pas te voir.'],['я должен его выучить','Je dois l’apprendre.'],['она меня не любит','Elle ne m’aime pas.'],['они нас ищут?','Ils nous cherchent ?'],['нужно их найти','Il faut les trouver.']
  ]
];
const groupedTranslations = translationFive.map((group,i)=>`<div class="translation-group"><h4>${i+1}.</h4>${pairs(group)}</div>`).join('');

const exercises = [
  {n:1,title:'Dites les dates.',parts:[
    part('a','Dites les dates.',`<div class="date-grid">${dates.map(([date,words])=>`<div class="date-card"><strong>${date}</strong>${reveal(words)}</div>`).join('')}</div>`),
    part('b','Répondez aux questions.',pairs([
      ['Quels sont les mois d’été ? d’hiver ? d’automne ? de printemps ?','Les mois d’été sont juin, juillet et août ; ceux d’hiver sont décembre, janvier et février ; ceux d’automne sont septembre, octobre et novembre ; ceux de printemps sont mars, avril et mai.'],
      ['Quand commence l’été ? l’automne ? l’hiver ? le printemps ?','En général, l’été commence le 21 juin, l’automne le 22 septembre, l’hiver le 21 décembre et le printemps le 20 mars.'],
      ['Quel mois est-ce que vous aimez ? Pourquoi ?','J’aime le mois de mai parce qu’il fait beau.'],
      ['Quand est-ce que vous partez en vacances ?','Je pars en vacances en août.'],
      ['Quand commencent les vacances d’hiver / d’été ?','Les vacances d’hiver commencent en décembre et celles d’été en juin.'],
      ['Quelle est la date d’aujourd’hui ?',`Aujourd’hui, nous sommes le ${dateAnswer}.`],
      ['Quelle est la date de votre anniversaire ?','Mon anniversaire est le 15 mai.'],
      ['Quand est-ce que votre mère (père) fête son anniversaire ?','Ma mère fête son anniversaire le 8 mars.'],
      ['Est-ce qu’il y a une date importante pour vous ? pour votre famille ?','Oui, le 1er janvier est une date importante pour ma famille.'],
      ['Quand commence le premier semestre à l’université ?','Le premier semestre commence en septembre.'],
      ['Quand commence la session d’hiver ?','La session d’hiver commence en janvier.']
    ]))
  ]},
  {n:2,title:'Mémorisez !',parts:[
    `<div class="memo"><div><strong>cette semaine</strong> — на этой неделе</div><div><strong>ce week-end</strong> — на этих выходных</div><div><strong>cet été</strong> — этим летом</div></div>`,
    part('','Répondez aux questions.',pairs([
      ['Qu’est-ce que vous allez faire ce soir ? demain ?','Ce soir, je vais lire. Demain, je vais travailler.'],
      ['Qu’est-ce que vous allez faire cette semaine ? ce week-end ?','Cette semaine, je vais étudier. Ce week-end, je vais voir mes amis.'],
      ['Qu’est-ce que vous allez faire cet été ? Est-ce que vous allez partir en vacances ? Où ?','Cet été, je vais partir en vacances en France.']
    ]))
  ]},
  {n:3,title:'L’agenda de Mme Cervais.',parts:[
    part('a','Regardez l’agenda de Mme Cervais. Dites ce qu’elle va faire cette semaine.',`${note('Modèle : Lundi 21 novembre de 8 h à 10 h, Mme Cervais va faire ses courses. Après…')}${agendaHtml}`),
    part('b','Jouez un dialogue.',`${note('L’amie de Martine Cervais, Françoise Fleury, veut connaître ses projets pour la semaine. Elle téléphone à Mme Cervais. Martine dit qu’elle est occupée tous les jours et invite Françoise à prendre le thé dimanche.')}
      <div class="dialogue"><p><b>Mme Fleury :</b> Bonjour, Martine !</p><p><b>Mme Cervais :</b> Bonjour, Françoise ! Tu vas bien ?</p><p><b>Mme Fleury :</b> Je vais bien, merci. Et toi ?</p><p><b>Mme Cervais :</b> Ça va, merci.</p><p><b>Mme Fleury :</b> Qu’est-ce que tu vas faire lundi ?</p><p><b>Mme Cervais :</b> Lundi matin je vais faire ${gap('mes courses')}. ${gap('Puis je vais faire le ménage')}.</p><p><b>Mme Fleury :</b> Et mardi ?</p><p><b>Mme Cervais :</b> ${gap('Je vais voir ma cousine Hélène et déjeuner avec elle')}.</p><p><b>Mme Fleury :</b> Et mercredi, jeudi, vendredi et samedi ?</p><p><b>Mme Cervais :</b> ${gap('Mercredi je vais chez le médecin. Jeudi je vais au musée et au théâtre. Vendredi je vais au parc et à un cours de cuisine. Samedi je vais à la FNAC et à un anniversaire')}.</p><p><b>Mme Fleury :</b> Tu es occupée toute la semaine ! Et dimanche ?</p><p><b>Mme Cervais :</b> Dimanche je vais rester à la maison. Je vais ${gap('lire, écrire à ma sœur, appeler Marc et préparer une tarte au citron')}. Tu veux venir chez moi pour la tarte au citron ?</p><p><b>Mme Fleury :</b> Avec plaisir !</p></div>`)
  ]},
  {n:4,title:'Proposez trois activités qu’on peut faire…',parts:[pairs([
    ['le soir, en ville, avec des amis →','On peut aller au cinéma, dîner au restaurant et se promener dans le centre-ville.'],
    ['un dimanche après-midi, en famille, à la maison →','On peut jouer à des jeux, regarder un film et préparer un gâteau.'],
    ['un samedi de beau temps, avec des enfants →','On peut aller au parc, faire du vélo et jouer au ballon.'],
    ['un soir de pluie (дождь), seul(e), à la maison →','On peut lire un livre, écouter de la musique et regarder un film.']
  ])]},
  {n:5,title:'Les pronoms compléments.',parts:[
    part('a','Répondez aux questions.',`${note('Modèle : Tu me cherches ? — Oui, je te cherche. / Non, je ne te cherche pas.')}${pairs([
      ['Tu me vois ?','Oui, je te vois. / Non, je ne te vois pas.'],['Tu m’écoutes ?','Oui, je t’écoute. / Non, je ne t’écoute pas.'],['Tu m’aimes ?','Oui, je t’aime. / Non, je ne t’aime pas.'],['Tu me regardes ?','Oui, je te regarde. / Non, je ne te regarde pas.'],['Il vous appelle ?','Oui, il nous appelle. / Non, il ne nous appelle pas.'],['Il vous connaît ?','Oui, il nous connaît. / Non, il ne nous connaît pas.'],['Il vous comprend ?','Oui, il nous comprend. / Non, il ne nous comprend pas.'],['Il vous invite ?','Oui, il nous invite. / Non, il ne nous invite pas.']
    ])}`),
    part('b','Remplacez les mots soulignés par les pronoms. Mettez la phrase à la forme négative.',`${note('Modèle : Je connais Pierre. → Je le connais. Je ne le connais pas.')}${pairs([
      ['Je fais toujours <u>mes devoirs</u>.','Je les fais toujours. Je ne les fais pas toujours.'],
      ['Je cherche <u>mon sac</u>.','Je le cherche. Je ne le cherche pas.'],
      ['J’apprends <u>l’allemand</u>.','Je l’apprends. Je ne l’apprends pas.'],
      ['Les enfants regardent <u>le tableau</u>.','Les enfants le regardent. Les enfants ne le regardent pas.'],
      ['Ils voient <u>leur voiture</u>.','Ils la voient. Ils ne la voient pas.'],
      ['Je veux mettre <u>cette robe</u>.','Je veux la mettre. Je ne veux pas la mettre.'],
      ['Vous comprenez <u>ce texte</u> ?','Vous le comprenez ? Vous ne le comprenez pas ?'],
      ['Tu connais <u>Mme Duval</u> ?','Tu la connais ? Tu ne la connais pas ?'],
      ['Vous connaissez <u>ces villes</u> ?','Vous les connaissez ? Vous ne les connaissez pas ?'],
      ['Nous devons prendre <u>le bus numéro 25</u> ?','Nous devons le prendre ? Nous ne devons pas le prendre ?']
    ])}`),
    part('c','Écoutez et répondez aux questions.',`${note('Modèle : Est-ce que tu aimes ce livre ? — Oui, je l’aime. / Non, je ne l’aime pas. Аудиозапись не была приложена к страницам.')}`),
    part('d','Répondez aux questions.',`${note('Вопросы 1–4 относятся к диалогу из аудио, которого нет в присланных материалах. Для остальных приведены варианты личных ответов.')}${list([
      'Est-ce que Marc connaît Fabrice ?','Est-ce que Fabrice et Arlette aiment le projet de Marc ?','Où est-ce que Marc voit Claire ?','Est-ce que Claire trouve enfin son billet ?'
    ])}${pairs([
      ['Est-ce que vous aimez les croissants ?','Oui, je les aime.'],
      ['Est-ce que vous prenez le bus pour aller à l’université / au bureau ?','Oui, je le prends pour aller à l’université.'],
      ['Est-ce que vous apprenez l’italien ?','Non, je ne l’apprends pas.'],
      ['Est-ce que vous connaissez la météo pour demain ?','Oui, je la connais.'],
      ['Est-ce que vous aimez les chansons de Jacques Brel ?','Oui, je les aime.'],
      ['Est-ce que vous perdez souvent vos affaires ?','Non, je ne les perds pas souvent.']
    ],5)}`),
    part('e','Traduisez.',groupedTranslations)
  ]},
  {n:6,title:'Le futur proche.',parts:[
    part('a','Mettez les phrases au futur proche.',`${note('Modèle A : Aujourd’hui nous avons un cours de français. (demain) → Demain nous allons avoir un cours de français.')}${pairs([
      ['Ce matin il fait beau. (demain matin)','Demain matin, il va faire beau.'],
      ['Ce soir ils ont une réunion au bureau. (demain soir)','Demain soir, ils vont avoir une réunion au bureau.'],
      ['Les élèves lisent une histoire intéressante. (cet après-midi)','Cet après-midi, les élèves vont lire une histoire intéressante.'],
      ['J’écris un message à mes parents. Je parle de mes études. (ce soir)','Ce soir, je vais écrire un message à mes parents. Je vais parler de mes études.'],
      ['Vous faites ces exercices de grammaire. (aujourd’hui)','Aujourd’hui, vous allez faire ces exercices de grammaire.'],
      ['Tu prends le train pour aller à Paris. (samedi)','Samedi, tu vas prendre le train pour aller à Paris.'],
      ['Nous disons à notre chef que nous avons un nouveau projet. (lundi)','Lundi, nous allons dire à notre chef que nous avons un nouveau projet.'],
      ['Vous jouez ensemble au tennis. (ce week-end)','Ce week-end, vous allez jouer ensemble au tennis.'],
      ['Tu ne regardes pas la télé. (demain)','Demain, tu ne vas pas regarder la télé.'],
      ['Nous ne visitons pas la Madeleine. (jeudi)','Jeudi, nous n’allons pas visiter la Madeleine.'],
      ['Ils ne partent pas en vacances. (cet été)','Cet été, ils ne vont pas partir en vacances.'],
      ['Je ne sors pas au cinéma. (cette semaine)','Cette semaine, je ne vais pas sortir au cinéma.']
    ])}<p class="notice">Modèle B : Je fais cet exercice. → Je vais faire cet exercice. Je vais le faire. Je ne vais pas le faire.</p>${pairs([
      ['J’ouvre la fenêtre.','Je vais ouvrir la fenêtre. Je vais l’ouvrir. Je ne vais pas l’ouvrir.'],
      ['Nous lisons ce roman américain.','Nous allons lire ce roman américain. Nous allons le lire. Nous n’allons pas le lire.'],
      ['Vous écrivez ce message.','Vous allez écrire ce message. Vous allez l’écrire. Vous n’allez pas l’écrire.'],
      ['Ils écoutent ce concert de piano.','Ils vont écouter ce concert de piano. Ils vont l’écouter. Ils ne vont pas l’écouter.'],
      ['Tu vois tes parents.','Tu vas voir tes parents. Tu vas les voir. Tu ne vas pas les voir.'],
      ['Ils font leurs valises.','Ils vont faire leurs valises. Ils vont les faire. Ils ne vont pas les faire.'],
      ['J’apprends ces poèmes.','Je vais apprendre ces poèmes. Je vais les apprendre. Je ne vais pas les apprendre.'],
      ['Il met sa belle cravate.','Il va mettre sa belle cravate. Il va la mettre. Il ne va pas la mettre.'],
      ['Vous dites votre opinion.','Vous allez dire votre opinion. Vous allez la dire. Vous n’allez pas la dire.'],
      ['Ils chantent ces chansons.','Ils vont chanter ces chansons. Ils vont les chanter. Ils ne vont pas les chanter.']
    ])}`),
    part('b','Traduisez.',pairs([
      ['Они не придут к нам в пятницу вечером.','Ils ne vont pas venir chez nous vendredi soir.'],
      ['Я увижу его во вторник утром.','Je vais le voir mardi matin.'],
      ['Вы напишете это письмо ? — Да, мы его напишем сегодня днем.','Vous allez écrire cette lettre ? — Oui, nous allons l’écrire cet après-midi.'],
      ['Ты прочитаешь эту книгу ? — Нет, я не буду ее читать !','Tu vas lire ce livre ? — Non, je ne vais pas le lire !'],
      ['Вы сделаете эту работу в четверг ? — Да, мы ее сделаем.','Vous allez faire ce travail jeudi ? — Oui, nous allons le faire.'],
      ['Сегодня вечером ты наденешь свой новый пиджак ? — Нет, я его не надену.','Ce soir, tu vas mettre ta nouvelle veste ? — Non, je ne vais pas la mettre.'],
      ['Что они будут делать на этой неделе ? — Они будут работать.','Qu’est-ce qu’ils vont faire cette semaine ? — Ils vont travailler.'],
      ['В июне мы останемся в Париже. А в июле мы поедем в отпуск.','En juin, nous allons rester à Paris. Et en juillet, nous allons partir en vacances.'],
      ['Завтра вечером я не буду делать уроки. Я пойду на прогулку.','Demain soir, je ne vais pas faire mes devoirs. Je vais me promener.'],
      ['На этих выходных мы с друзьями будем играть в теннис.','Ce week-end, mes amis et moi, nous allons jouer au tennis.'],
      ['Что ты скажешь своим родителям ?','Qu’est-ce que tu vas dire à tes parents ?'],
      ['Завтра ты останешься дома и не будешь смотреть телевизор, а будешь делать уборку.','Demain, tu vas rester à la maison et tu ne vas pas regarder la télé, mais tu vas faire le ménage.']
    ]))
  ]},
  {n:7,title:'Posez des questions sur les termes soulignés.',parts:[pairs([
    ['Fabrice habite <u>à Rennes</u>.','Où est-ce que Fabrice habite ?'],
    ['Il quitte Mireille <u>parce qu’il ne l’aime pas</u>.','Pourquoi est-ce qu’il quitte Mireille ?'],
    ['Ils reviennent <u>demain soir</u>.','Quand est-ce qu’ils reviennent ?'],
    ['<u>Michel</u> connaît Mme Vidal.','Qui est-ce qui connaît Mme Vidal ?'],
    ['<u>Les élèves</u> écrivent <u>des histoires</u>.',['Qui est-ce qui écrit des histoires ?','Qu’est-ce que les élèves écrivent ?']],
    ['Les enfants <u>chantent et dansent</u>.','Qu’est-ce que les enfants font ?'],
    ['Ils vont venir <u>à 18 heures</u>.','À quelle heure est-ce qu’ils vont venir ?']
  ])]},
  {n:8,title:'Savoir.',parts:[
    part('a','Savoir',list([
      `Nous ${gap('savons')} que Justin veut aller à Genève.`,
      `Elle ne ${gap('sait')} pas faire des crêpes (блины).`,
      `Ils ${gap('savent')} que la fête est dimanche.`,
      `Vous ${gap('savez')} pourquoi Antoine veut être médecin ? — Non, je ne ${gap('sais')} pas.`,
      `On ${gap('sait')} qu’à Bruxelles il pleut souvent en été.`,
      `Qu’est-ce que tu ${gap('sais')} de notre nouveau maire ?`
    ])),
    part('b','Savoir + infinitif',`${note('Modèle : Nous allons à la discothèque, tu viens avec nous ? — Non, merci, je ne sais pas danser.')}${list([
      `Nous voulons jouer à la pétanque. Tu joues avec nous ? — Non, merci, ${gap('je ne sais pas jouer à la pétanque')}.`,
      `Tu peux nous chanter une chanson ? — Pardon, mais ${gap('je ne sais pas chanter')}.`,
      `Sébastien, tu peux écrire ton nom ici ? — Mais ${gap('je ne sais pas écrire')}.`,
      `Léo, tu peux lire ce mot ? — Je ne peux pas, ${gap('je ne sais pas lire')}.`,
      `J’adore les desserts français ! Tu peux préparer une tarte Tatin ? — Je suis désolé, mais ${gap('je ne sais pas préparer une tarte Tatin')}.`
    ])}`),
    part('c','À vous ! Qu’est-ce que vous savez faire ?',pairs([
      ['Vous savez jouer au tennis ?','Oui, je sais jouer au tennis.'],
      ['Vous savez bien faire la cuisine ?','Oui, je sais bien faire la cuisine.'],
      ['Vous savez chanter ? danser ?','Je sais chanter, mais je ne sais pas danser.'],
      ['Vous savez écrire des poèmes ?','Non, je ne sais pas écrire de poèmes.']
    ]))
  ]}
];

const names = ['Dates','Mémorisez','Agenda','Activités','Pronoms','Futur proche','Questions','Savoir'];
document.querySelector('#exercise-nav').innerHTML = exercises.map((exercise,index) => `<a href="#exercise-${exercise.n}"><span>${String(exercise.n).padStart(2,'0')}</span><span>${names[index]}</span></a>`).join('');
document.querySelector('#exercises').innerHTML = exercises.map(exercise => `<article class="exercise" id="exercise-${exercise.n}"><div class="exercise-head"><div class="number">${exercise.n}.</div><div class="exercise-heading"><h2>${exercise.title}</h2></div></div><div class="exercise-body">${exercise.parts.join('')}</div></article>`).join('');

const revealButtons = [...document.querySelectorAll('.gap,.reveal')];
function setShown(button, shown) { button.classList.toggle('shown',shown); button.setAttribute('aria-pressed',String(shown)); }
document.querySelector('#exercises').addEventListener('click', event => { const button = event.target.closest('.gap,.reveal'); if (button) setShown(button,!button.classList.contains('shown')); });
document.querySelector('#toggle-all').addEventListener('click', event => { const show = event.currentTarget.textContent.includes('Показать'); revealButtons.forEach(button => setShown(button,show)); event.currentTarget.textContent = show ? 'Скрыть все ответы' : 'Показать все ответы'; });
const seen = new Set();
const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { seen.add(entry.target.id); document.querySelector('#progress').textContent = `${seen.size} из 8 упражнений`; document.querySelectorAll('#exercise-nav a').forEach(link => link.classList.toggle('current',link.getAttribute('href') === `#${entry.target.id}`)); } }); }, {rootMargin:'-20% 0px -65% 0px'});
document.querySelectorAll('.exercise').forEach(element => observer.observe(element));
const menu = document.querySelector('.sidebar'); const menuToggle = document.querySelector('#menu-toggle');
menuToggle.addEventListener('click', () => { const open = menu.classList.toggle('open'); menuToggle.setAttribute('aria-expanded',String(open)); });
document.querySelectorAll('#exercise-nav a').forEach(link => link.addEventListener('click', () => { menu.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false'); }));
