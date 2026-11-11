const gap = answer => '<button class="gap" type="button" aria-label="Открыть пропуск" aria-pressed="false">'+answer+'</button>';
const reveal = answer => '<button class="reveal" type="button" aria-label="Показать ответ" aria-pressed="false">'+answer+'</button>';
const list = items => '<ol class="items">'+items.map(item=>'<li>'+item+'</li>').join('')+'</ol>';
const pairs = (items,start=1) => '<ol class="items answer-pairs" start="'+start+'">'+items.map(([q,a])=>'<li>'+q+(Array.isArray(a)?a.map(reveal).join(''):reveal(a))+'</li>').join('')+'</ol>';
const part = (letter,title,body,hint='') => '<section class="part"><h3>'+(letter?'<span class="letter">'+letter+')</span>':'')+title+'</h3>'+(hint?'<p class="hint">'+hint+'</p>':'')+body+'</section>';
const note = text => '<p class="notice">'+text+'</p>';
const dialogue = rows => '<div class="dialogue">'+rows.map(([p,line])=>'<p><b>'+p+' :</b> '+line+'</p>').join('')+'</div>';
const blank = '<span class="audio-blank" aria-label="Пропуск из аудиозадания">…</span>';
const audioNote = note('Аудиозапись не приложена. Задание сохранено; точные ответы по записи пока недоступны.');
const choices = (n,groups) => groups.map(([q,options],i)=>'<fieldset class="listening-choice"><legend>'+(i+1)+'. '+q+'</legend>'+options.map((s,j)=>'<label><input type="radio" name="audio-'+n+'-'+i+'" value="'+j+'"> '+s+'</label>').join('')+'</fieldset>').join('');
const exercises = [
{n:1,title:'Lisez les nombres.',page:144,parts:[
part('a','Lisez les séries.',pairs([
['74','soixante-quatorze'],['67','soixante-sept'],['96','quatre-vingt-seize'],['80','quatre-vingts'],['61','soixante et un'],['93','quatre-vingt-treize'],['81','quatre-vingt-un'],['79','soixante-dix-neuf'],['65','soixante-cinq'],['88','quatre-vingt-huit'],['71','soixante et onze'],['90','quatre-vingt-dix'],['77','soixante-dix-sept'],['16','seize'],['28','vingt-huit'],['99','quatre-vingt-dix-neuf']
])),
part('b','Lisez les séries.',pairs([
['18','dix-huit'],['31','trente et un'],['26','vingt-six'],['72','soixante-douze'],['58','cinquante-huit'],['44','quarante-quatre'],['92','quatre-vingt-douze'],['80','quatre-vingts'],['71','soixante et onze'],['99','quatre-vingt-dix-neuf'],['17','dix-sept'],['24','vingt-quatre'],['66','soixante-six'],['14','quatorze'],['78','soixante-dix-huit'],['85','quatre-vingt-cinq']
])),note('80 отдельно: quatre-vingts. Перед следующим числительным s исчезает: quatre-vingt-un. В 71 есть et, в 81 и 91 — нет.')
]},
{n:2,title:'Un week-end à Rennes. Ça coûte combien ?',page:145,parts:[
note('Прочитайте цены и ответьте полными фразами.'),
pairs([
['Un billet de train Paris–Rennes — 64 €','Un billet de train Paris–Rennes coûte soixante-quatre euros.'],
['Un ticket de bus Paris–Rennes — 19 €','Un ticket de bus Paris–Rennes coûte dix-neuf euros.'],
['Une nuit à l’hôtel « Anne de Bretagne » — 78 €','Une nuit à l’hôtel « Anne de Bretagne » coûte soixante-dix-huit euros.'],
['Une entrée au Musée des Beaux-Arts — 6 €','Une entrée au Musée des Beaux-Arts coûte six euros.'],
['Un grand homard au Marché des Lices — 29 €','Un grand homard au Marché des Lices coûte vingt-neuf euros.'],
['Un Menu Dégustation au restaurant « Fleur de Lices » — 85 €','Un Menu Dégustation coûte quatre-vingt-cinq euros.'],
['Une galette traditionnelle bretonne — 7,50 €','Une galette traditionnelle bretonne coûte sept euros cinquante.'],
['Une crêpe (pommes, caramel, chantilly) — 6,90 €','Une crêpe coûte six euros quatre-vingt-dix.'],
['Un café — 1,80 €','Un café coûte un euro quatre-vingts.'],
['Un thé — 3,50 €','Un thé coûte trois euros cinquante.'],
['Une bouteille de cidre — 9 €','Une bouteille de cidre coûte neuf euros.']
]),note('Цены приведены как в учебнике — это материал для чтения числительных.')
]},
{n:3,title:'À la gare de Rennes · écoutez le dialogue.',page:145,parts:[
audioNote,choices(3,[
['Marc achète',['deux allers-retours pour Rennes','deux allers-retours pour Saint-Malo','deux allers simples pour Saint-Malo']],
['Le train part',['à 8 h 42','à 9 h','à 9 h 16']],
['Le train arrive à Rennes',['à 20 h 48','à 21 h','à 19 h 55']]
]),'<p>4. Marc paye '+blank+' euros.</p>'
]},
{n:4,title:'Les couleurs.',page:145,parts:[
part('a','Répondez aux questions.',pairs([
['De quelle couleur est le ciel quand il fait beau ? quand il pleut ?','Quand il fait beau, le ciel est bleu. Quand il pleut, il est gris.'],
['De quelle couleur est la neige ? l’herbe ?','La neige est blanche et l’herbe est verte.'],
['De quelle couleur est la mer en été ? en hiver ?','En été, la mer est souvent bleue ; en hiver, elle peut être grise.'],
['De quelle couleur sont les fleurs ?','Les fleurs peuvent être rouges, jaunes, blanches, roses ou violettes.'],
['De quelle couleur sont les tomates ? les pommes ? les bananes ?','Les tomates sont rouges. Les pommes sont vertes, jaunes ou rouges. Les bananes sont jaunes.'],
['Quelle est votre couleur préférée ?','Ma couleur préférée est le bleu.'],
['Vous aimez les robes / les chemises de quelle couleur ?','J’aime les robes bleues et les chemises blanches.'],
['Vous voudriez avoir une voiture de quelle couleur ?','Je voudrais avoir une voiture grise.'],
['Quelles couleurs choisissez-vous pour décorer votre maison ?','Je choisis le blanc et le beige.'],
['Quelles couleurs peut-on voir dans différentes régions de France ?','En Provence, on peut voir des couleurs chaudes ; en Touraine, des pierres claires et des toits gris ; au Pays Basque, des maisons blanches et rouges.']
]),'Для личных вопросов приведены примеры; возможны другие ответы.'),
part('b','Traduisez.',pairs([
['маленькое зелёное яблоко','une petite pomme verte'],['большой жёлтый мяч','un grand ballon jaune'],['новая белая рубашка','une nouvelle chemise blanche'],['старый синий галстук','une vieille cravate bleue'],['маленький коричневый чемодан','une petite valise marron'],['вкусный чёрный кофе','un bon café noir'],['красивый красный кошелёк','un beau porte-monnaie rouge'],['розовые цветы','des fleurs roses'],['новый оранжевый платок','un nouveau foulard orange'],['старое серое здание','un vieux bâtiment gris'],['красивое бежевое платье','une belle robe beige']
])),note('Orange и marron в качестве обозначений цвета не изменяются: des chemises orange, des valises marron.')
]},
{n:5,title:'Répondez comme dans le modèle.',page:146,parts:[
note('Modèle : Est-ce qu’elle te montre sa nouvelle robe ? → Oui, elle me montre sa nouvelle robe. / Non, elle ne me montre pas sa nouvelle robe.'),
pairs([
['Est-ce qu’ils t’écrivent souvent ?',['Oui, ils m’écrivent souvent.','Non, ils ne m’écrivent pas souvent.']],
['Est-ce que tu veux me parler ?',['Oui, je veux te parler.','Non, je ne veux pas te parler.']],
['Est-ce que je dois vous téléphoner ?',['Oui, vous devez me téléphoner.','Non, vous ne devez pas me téléphoner.']],
['Est-ce qu’il vous fait des cadeaux ?',['Oui, il me fait des cadeaux.','Non, il ne me fait pas de cadeaux.']],
['Est-ce qu’elle t’achète des cravates ?',['Oui, elle m’achète des cravates.','Non, elle ne m’achète pas de cravates.']],
['Est-ce que ce cadeau vous fait plaisir ?',['Oui, ce cadeau me fait plaisir.','Non, ce cadeau ne me fait pas plaisir.']],
['Est-ce qu’ils vont nous montrer leur nouvelle voiture ?',['Oui, ils vont nous montrer leur nouvelle voiture.','Non, ils ne vont pas nous montrer leur nouvelle voiture.']]
]),note('В ответах с vous выбран вариант вежливого обращения к одному человеку. В вопросе 7 nous понимается как «мы с собеседником», поэтому в ответе остаётся nous.')
]},
{n:6,title:'Remplacez les mots soulignés par les pronoms.',page:146,parts:[pairs([
['Nous téléphonons <u>au directeur</u>.','Nous lui téléphonons.'],
['Elle n’écrit pas <u>à ses amis</u>.','Elle ne leur écrit pas.'],
['Tu dois lire ce livre <u>à ton fils</u>.','Tu dois lui lire ce livre.'],
['Ils répondent <u>au journaliste</u>.','Ils lui répondent.'],
['Je ne veux pas parler <u>à ces personnes</u>.','Je ne veux pas leur parler.'],
['Il n’achète pas de cadeau <u>à sa femme</u>.','Il ne lui achète pas de cadeau.'],
['Je donne ce livre <u>à Mme Cervais</u>.','Je lui donne ce livre.'],
['Qu’est-ce que tu offres <u>à Claire</u> ?','Qu’est-ce que tu lui offres ?'],
['Tu achètes ce foulard <u>à ta mère</u> ?','Tu lui achètes ce foulard ?'],
['La vendeuse montre le sac <u>à la cliente</u>.','La vendeuse lui montre le sac.'],
['Les enfants disent « au revoir » <u>à leurs parents</u>.','Les enfants leur disent « au revoir ».']
])]},
{n:7,title:'Écoutez les questions. Répondez comme dans le modèle.',page:146,parts:[
audioNote,note('Modèle : Tu écris à ton frère ? → Oui, je lui écris. / Non, je ne lui écris pas.')
]},
{n:8,title:'Pronoms COD / COI.',page:146,parts:[
note('Remplacez les mots soulignés par les pronoms.'),
pairs([
['Claire ouvre <u>son sac</u>.','Claire l’ouvre.'],
['Ils invitent <u>tous leurs amis</u> à cette fête.','Ils les invitent à cette fête.'],
['Pourquoi tu ne mets pas <u>ta robe bleue</u> ?','Pourquoi tu ne la mets pas ?'],
['Marie ne répond pas <u>à Fabrice</u> ? Je vais téléphoner <u>à Marie</u>.','Marie ne lui répond pas ? Je vais lui téléphoner.'],
['Vous achetez ce cadeau <u>à votre mère</u> ? — Non, ma mère n’aime pas <u>les cadeaux</u>.','Vous lui achetez ce cadeau ? — Non, ma mère ne les aime pas.'],
['L’institutrice dit « bon appétit » <u>aux enfants</u>.','L’institutrice leur dit « bon appétit ».'],
['Il ne faut pas ouvrir <u>la fenêtre</u>, il fait très froid.','Il ne faut pas l’ouvrir, il fait très froid.'],
['À la gare la foule sépare <u>Claire et Marc</u>. Marc perd <u>Claire</u>. Que faire ? Il doit chercher <u>Claire</u>.','À la gare, la foule les sépare. Marc la perd. Que faire ? Il doit la chercher.'],
['Il ne faut pas parler <u>à mes parents</u> de cette histoire.','Il ne faut pas leur parler de cette histoire.'],
['Je n’écris pas <u>à mes amis français</u>, je téléphone toujours <u>à mes amis</u>.','Je ne leur écris pas, je leur téléphone toujours.']
])
]},
{n:9,title:'Révisez les pronoms. Traduisez les séries.',page:146,parts:[
part('a','COD / COI.',pairs([
['Мы читаем эту газету. Мы её читаем. Мы её не читаем. Мы хотим её прочитать.',['Nous lisons ce journal.','Nous le lisons.','Nous ne le lisons pas.','Nous voulons le lire.']],
['Вы слушаете этого журналиста. Вы его слушаете. Вы его не слушаете. Вы должны его послушать.',['Vous écoutez ce journaliste.','Vous l’écoutez.','Vous ne l’écoutez pas.','Vous devez l’écouter.']],
['Она надевает это платье. Она его надевает. Она его не надевает. Она собирается его надеть.',['Elle met cette robe.','Elle la met.','Elle ne la met pas.','Elle va la mettre.']],
['Они переводят эту песню. Они её переводят. Они её не переводят. Они могут её перевести.',['Ils traduisent cette chanson.','Ils la traduisent.','Ils ne la traduisent pas.','Ils peuvent la traduire.']],
['Мы видим эти дома. Мы их видим. Мы их не видим. Мы хотим их увидеть.',['Nous voyons ces maisons.','Nous les voyons.','Nous ne les voyons pas.','Nous voulons les voir.']],
['Вы делаете эти подарки. Вы их делаете. Вы их не делаете. Вы собираетесь их сделать.',['Vous faites ces cadeaux.','Vous les faites.','Vous ne les faites pas.','Vous allez les faire.']],
['Они говорят спасибо учительнице. Они ей говорят спасибо. Они не говорят ей спасибо. Они хотят сказать ей спасибо!',['Ils disent merci à l’institutrice.','Ils lui disent merci.','Ils ne lui disent pas merci.','Ils veulent lui dire merci !']],
['Вы пишете своему адвокату. Вы ему пишете. Вы ему не пишете. Вы можете ему написать.',['Vous écrivez à votre avocat.','Vous lui écrivez.','Vous ne lui écrivez pas.','Vous pouvez lui écrire.']],
['Они отвечают своим коллегам. Они им отвечают. Они им не отвечают. Они должны им ответить.',['Ils répondent à leurs collègues.','Ils leur répondent.','Ils ne leur répondent pas.','Ils doivent leur répondre.']],
['Он покупает жене цветы. Он ей покупает цветы. Он ей не покупает цветы. Он хочет ей купить цветы.',['Il achète des fleurs à sa femme.','Il lui achète des fleurs.','Il ne lui achète pas de fleurs.','Il veut lui acheter des fleurs.']]
])),
part('b','Les verbes pronominaux.',pairs([
['Я гуляю. Я не гуляю. Я люблю гулять.',['Je me promène.','Je ne me promène pas.','J’aime me promener.']],
['Вы отдыхаете. Вы не отдыхаете. Вы должны отдохнуть.',['Vous vous reposez.','Vous ne vous reposez pas.','Vous devez vous reposer.']],
['Они встречаются. Они не встречаются. Они хотят встретиться.',['Ils se voient.','Ils ne se voient pas.','Ils veulent se voir.']],
['Мы купаемся. Мы не купаемся. Мы можем искупаться.',['Nous nous baignons.','Nous ne nous baignons pas.','Nous pouvons nous baigner.']],
['Она интересуется кино. Она не интересуется кино. Она начинает интересоваться кино.',['Elle s’intéresse au cinéma.','Elle ne s’intéresse pas au cinéma.','Elle commence à s’intéresser au cinéma.']],
['Ты развлекаешься. Ты не развлекаешься. Ты можешь развлечься.',['Tu t’amuses.','Tu ne t’amuses pas.','Tu peux t’amuser.']]
]))
]},

{n:10,title:'Donnez toutes les formes de l’impératif.',page:147,parts:[
note('Формы даны в порядке tu → nous → vous.'),
pairs([
['regarder',['Regarde !','Regardons !','Regardez !']],
['téléphoner',['Téléphone !','Téléphonons !','Téléphonez !']],
['lire',['Lis !','Lisons !','Lisez !']],
['écrire',['Écris !','Écrivons !','Écrivez !']],
['partir',['Pars !','Partons !','Partez !']],
['venir',['Viens !','Venons !','Venez !']],
['aller',['Va !','Allons !','Allez !']],
['apprendre',['Apprends !','Apprenons !','Apprenez !']],
['attendre',['Attends !','Attendons !','Attendez !']],
['offrir',['Offre !','Offrons !','Offrez !']]
])
]},
{n:11,title:'L’impératif : consignes et conseils.',page:147,parts:[
part('a','Faites comme dans les modèles.',note('Modèle A : Tu dois partir. → Pars !<br>Modèle B : Tu ne dois pas partir. → Ne pars pas !')+
'<h4>Modèle A · forme affirmative</h4>'+pairs([
['Tu dois lire ce livre.','Lis ce livre !'],['Tu dois téléphoner à Marc.','Téléphone à Marc !'],['Tu dois quitter Paris.','Quitte Paris !'],['Vous devez regarder le tableau.','Regardez le tableau !'],['Vous devez venir ensemble.','Venez ensemble !'],['Nous devons attendre Michel.','Attendons Michel !'],['Nous devons répondre à nos collègues.','Répondons à nos collègues !'],['Nous devons voir son projet.','Voyons son projet !'],['Nous devons aller au cinéma.','Allons au cinéma !']
])+'<h4>Modèle B · forme négative</h4>'+pairs([
['Tu ne dois pas chanter ici.','Ne chante pas ici !'],['Tu ne dois pas prendre le bus.','Ne prends pas le bus !'],['Tu ne dois pas déjeuner dans ce café.','Ne déjeune pas dans ce café !'],['Vous ne devez pas danser.','Ne dansez pas !'],['Vous ne devez pas traduire ces phrases.','Ne traduisez pas ces phrases !'],['Vous ne devez pas lire ce texte.','Ne lisez pas ce texte !'],['Nous ne devons pas partir.','Ne partons pas !'],['Nous ne devons pas aller à cette fête.','N’allons pas à cette fête !'],['Nous ne devons pas parler de cette histoire.','Ne parlons pas de cette histoire !']
])),
part('b','Écoutez les phrases. Mettez-les à l’impératif.',audioNote+note('Modèle : Tu dois mettre ta cravate bleue ! → Mets ta cravate bleue !')),
part('c','Ajoutez une réplique pour donner un conseil.',note('Modèle : Tu es en retard ? → Alors, prends un taxi !')+pairs([
['Tes amis vont venir chez toi ce soir ?','Alors, prépare un bon dîner !'],
['Tu vas avoir ton cours de français demain ?','Alors, fais tes exercices !'],
['Tu travailles trop ? Tu es fatigué ?','Alors, repose-toi un peu !'],
['Vous avez faim ?','Alors, prenez un sandwich !'],
['Vous voulez sortir ce soir ?','Alors, allez au cinéma !'],
['Vous cherchez un cadeau ?','Alors, choisissez un beau livre !'],
['Vous voulez aller au centre-ville ?','Alors, prenez le bus !']
]),'Примеры советов; возможны другие ответы.')
]},
{n:12,title:'Écoutez et complétez le dialogue.',page:148,parts:[
audioNote,dialogue([
['Amélie','Anne, pourquoi es-tu si triste ? Qu’est-ce que tu as ?'],
['Anne','Gilles '+blank+'…'],
['Amélie','Ah bon ? Il '+blank+' de messages ?'],
['Anne','Non. Et il '+blank+' !'],
['Amélie',blank+', je suis sûre qu’il est occupé ! Il a beaucoup de travail.'],
['Anne','Non, je '+blank+' qu’il ne veut pas '+blank+'. Je '+blank+' des messages, et lui, il '+blank+' !'],
['Amélie','Peut-être qu’il '+blank+' tes messages… '+blank+' un peu !'],
['Anne','C’est triste d’attendre…'],
['Amélie','Mais '+blank+' à la maison ! '+blank+' au musée ! '+blank+' tes amies ! '+blank+' un bon café ! '+blank+' un dessert ! '+blank+' un livre intéressant ! Tu '+blank+' que Gilles '+blank+' ce soir.'],
['Anne','Merci, Amélie. Tu es très gentille. '+blank+' ! '+blank+' avec moi. '+blank+' au musée ensemble !']
])
]},
{n:13,title:'Formulez les questions.',page:148,parts:[
part('a','Trouvez une question pour chaque réponse.',pairs([
['— On est le 30 décembre.','— Quelle est la date aujourd’hui ?'],
['— Ils commencent le 16 janvier.','— Quand est-ce qu’ils commencent ?'],
['— Je suis avocat.','— Quelle est votre profession ?'],
['— 06 34 46 58 15.','— Quel est votre numéro de téléphone ?'],
['— Il fait mauvais. Il pleut.','— Quel temps fait-il ?'],
['— Ils partent en vacances en août.','— Quand est-ce qu’ils partent en vacances ?'],
['— On est mercredi.','— Quel jour sommes-nous ?'],
['— On doit être à l’aéroport à 16 h 30.','— À quelle heure doit-on être à l’aéroport ?'],
['— Nous allons à Madrid.','— Où est-ce que vous allez ?'],
['— Parce qu’il n’a pas mon numéro de téléphone.','— Pourquoi est-ce qu’il ne vous téléphone pas ?'],
['— Moi ! Je veux faire les courses.','— Qui veut faire les courses ?'],
['— C’est mon copain Frédéric.','— Qui est-ce ?'],
['— Elle danse très bien.','— Comment est-ce qu’elle danse ?'],
['— Je reviens de la banque.','— D’où est-ce que vous revenez ?'],
['— Ces fleurs coûtent 9 euros.','— Combien coûtent ces fleurs ?'],
['— Nous parlons du nouveau projet de Marc.','— De quoi est-ce que vous parlez ?'],
['— Elle dit que ce film est génial.','— Qu’est-ce qu’elle dit ?'],
['— Je vais payer par carte.','— Comment est-ce que vous allez payer ?'],
['— Dans la cantine il y a 30 tables.','— Combien de tables y a-t-il dans la cantine ?'],
['— Ce porte-monnaie est noir.','— De quelle couleur est ce porte-monnaie ?'],
['— Sébastien joue avec ses petites voitures.','— Avec quoi est-ce que Sébastien joue ?'],
['— 10 enfants vont venir à la fête d’anniversaire.','— Combien d’enfants vont venir à la fête d’anniversaire ?']
]),'Показан один возможный вопрос. В пункте 10 исходная реплика не называет действие; выбран естественный контекст телефонного звонка.'),
part('b','Posez la question selon le modèle.',note('Modèle : Nous allons dans un restaurant. → Vous allez dans quel restaurant ?')+pairs([
['Ils travaillent dans un hôpital.','Ils travaillent dans quel hôpital ?'],
['Je vais lui offrir une montre.','Tu vas lui offrir quelle montre ?'],
['On construit un supermarché.','On construit quel supermarché ?'],
['Nous allons écouter des chansons italiennes.','Vous allez écouter quelles chansons italiennes ?'],
['Je vais choisir des fruits pour le dessert.','Tu vas choisir quels fruits pour le dessert ?']
])),
part('c','Posez toutes les questions possibles.',pairs([
['Claire trouve son billet par terre.',[
'Qui trouve son billet par terre ?','Qu’est-ce que Claire trouve par terre ?','Où est-ce que Claire trouve son billet ?','Qu’est-ce que Claire fait ?','Est-ce que Claire trouve son billet par terre ?'
]],
['Fabrice et Arlette dînent ce soir chez leur mère.',[
'Qui dîne ce soir chez leur mère ?','Quand est-ce que Fabrice et Arlette dînent chez leur mère ?','Où est-ce que Fabrice et Arlette dînent ce soir ?','Chez qui est-ce que Fabrice et Arlette dînent ce soir ?','Qu’est-ce que Fabrice et Arlette font ce soir ?','Est-ce que Fabrice et Arlette dînent ce soir chez leur mère ?'
]],
['Marie ne veut pas sortir avec Gérard parce qu’il danse mal.',[
'Qui ne veut pas sortir avec Gérard ?','Avec qui est-ce que Marie ne veut pas sortir ?','Pourquoi est-ce que Marie ne veut pas sortir avec Gérard ?','Qu’est-ce que Marie ne veut pas faire ?','Comment est-ce que Gérard danse ?','Est-ce que Marie veut sortir avec Gérard ?'
]],
['Anne préfère offrir un parfum à sa copine parce que ce cadeau va lui faire plaisir.',[
'Qui préfère offrir un parfum à sa copine ?','Qu’est-ce qu’Anne préfère offrir à sa copine ?','À qui est-ce qu’Anne préfère offrir un parfum ?','Pourquoi est-ce qu’Anne préfère offrir un parfum à sa copine ?','Quel cadeau va faire plaisir à sa copine ?','Est-ce qu’Anne préfère offrir un parfum à sa copine ?'
]],
['Dans cette ville on va construire deux nouvelles piscines pour les enfants.',[
'Où est-ce qu’on va construire deux nouvelles piscines ?','Qu’est-ce qu’on va construire dans cette ville ?','Combien de nouvelles piscines est-ce qu’on va construire dans cette ville ?','Pour qui est-ce qu’on va construire deux nouvelles piscines ?','Est-ce qu’on va construire deux nouvelles piscines pour les enfants dans cette ville ?'
]]
]),'Основные вопросы к смысловым частям фраз. Можно также менять форму вопроса: est-ce que, инверсия, разговорный порядок слов.'),
part('d','Posez des questions à votre ami avec les mots suivants.',pairs([
['Mer ?','Tu vas souvent à la mer ?'],['Musée ?','Quel musée voudrais-tu visiter ?'],['Couleur ?','Quelle est ta couleur préférée ?'],['Anniversaire ?','Quelle est la date de ton anniversaire ?'],['Photo ?','Qui est sur cette photo ?'],['Film ?','Quel film veux-tu voir ?'],['Téléphone ?','Quel est ton numéro de téléphone ?'],['Livre ?','Quel livre lis-tu en ce moment ?'],['Dessert ?','Quel dessert préfères-tu ?'],['Saison ?','Quelle est ta saison préférée ?'],['Études ?','Où fais-tu tes études ?'],['Enfant ?','Combien d’enfants as-tu ?']
]),'Примеры вопросов.')
]},
{n:14,title:'Conjugaison : choisir, finir, offrir, ouvrir, croire.',page:149,parts:[
part('a','Conjuguez à toutes les personnes.',pairs([
['Je finis mon travail.',['Je finis mon travail.','Tu finis ton travail.','Il / Elle finit son travail.','Nous finissons notre travail.','Vous finissez votre travail.','Ils / Elles finissent leur travail.']],
['Je choisis un cadeau.',['Je choisis un cadeau.','Tu choisis un cadeau.','Il / Elle choisit un cadeau.','Nous choisissons un cadeau.','Vous choisissez un cadeau.','Ils / Elles choisissent un cadeau.']],
['J’offre des fleurs.',['J’offre des fleurs.','Tu offres des fleurs.','Il / Elle offre des fleurs.','Nous offrons des fleurs.','Vous offrez des fleurs.','Ils / Elles offrent des fleurs.']],
['Je crois que…',['Je crois que…','Tu crois que…','Il / Elle croit que…','Nous croyons que…','Vous croyez que…','Ils / Elles croient que…']]
])),
part('b','Ouvrez les parenthèses.', '<h4>Choisir / finir</h4>'+list([
'Qu’est-ce que vous (choisir) '+gap('choisissez')+' ? — Je '+gap('choisis')+' la mousse au chocolat.',
'Les classes (finir) '+gap('finissent')+' à 15 h.',
'Pourquoi tu ne (finir) '+gap('finis')+' pas ta glace ?',
'Nous (finir) '+gap('finissons')+' déjà notre travail.',
'Elle (choisir) '+gap('choisit')+' ce foulard bleu.',
'Ils (choisir) '+gap('choisissent')+' un prénom pour leur fils.',
'Vous (finir) '+gap('finissez')+' votre livre et après, au lit !'
])+'<h4>Ouvrir / offrir</h4>'+list([
'Nous lui (offrir) '+gap('offrons')+' un beau vase.',
'Qu’est-ce que tu (offrir) '+gap('offres')+' à ta femme ? — Je lui '+gap('offre')+' un bouquet de fleurs et un collier.',
'La petite Juliette (ouvrir) '+gap('ouvre')+' son cadeau. Ses parents lui (offrir) '+gap('offrent')+' un joli bracelet.',
'Les enfants (ouvrir) '+gap('ouvrent')+' leurs cahiers.'
])+'<h4>Croire</h4>'+list([
'Elle '+gap('croit')+' que je ne suis pas assez intelligent.',
'Il pleut. Nous '+gap('croyons')+' qu’il faut partir.',
'Ils '+gap('croient')+' que tu ne dois pas accepter ce travail.',
'Je '+gap('crois')+' que c’est une très bonne idée.',
'Vous '+gap('croyez')+' qu’il peut nous aider ?'
]))
]},
{n:15,title:'Quelque chose + de + adjectif. Traduisez.',page:149,parts:[pairs([
['что-нибудь банальное','quelque chose de banal'],['что-нибудь простое','quelque chose de simple'],['что-то интересное','quelque chose d’intéressant'],['что-то хорошее','quelque chose de bon'],['что-нибудь красивое','quelque chose de beau'],['что-то большое','quelque chose de grand']
]),note('После quelque chose перед прилагательным нужен de (перед гласной — d’). Прилагательное ставится в мужском роде единственного числа: quelque chose de beau.')]},
{n:16,title:'Prépositions et articles contractés.',page:150,parts:[
note('Употребите подходящие предлоги или слитные артикли. Знак «—» в ответе означает, что вставлять ничего не нужно.'),
list([
'Tu es toujours '+gap('en')+' retard.',
'Sa mère est femme '+gap('au')+' foyer. Elle ne doit pas aller '+gap('au')+' bureau tous les jours.',
gap('—')+' mardi je suis très occupé. '+gap('—')+' le matin je vais '+gap('à')+' Paris. J’ai le train '+gap('à')+' 6 h 14. Je reviens '+gap('de')+' Paris '+gap('à')+' minuit.',
'Ils cherchent un cadeau '+gap('pour')+' leur chef. Qu’est-ce qu’on peut offrir '+gap('à')+' un homme de 48 ans ?',
'Ne parle pas '+gap('à')+' Michel '+gap('de')+' notre promenade.',
'Tu es sage, tu vas '+gap('à')+' l’école et '+gap('après')+' les classes nous allons '+gap('au')+' café manger des éclairs '+gap('au')+' chocolat.',
'Qui peut aider '+gap('—')+' Gabriel '+gap('à')+' faire ce projet ?',
'Tu es content '+gap('de')+' ta fête, chéri ?',
'Les hommes '+gap('d’')+'affaires sont toujours si occupés !',
'Tu dois montrer ton projet '+gap('au')+' maire '+gap('de')+' la ville.',
'Je vais acheter '+gap('aux')+' enfants un ballon pour jouer '+gap('au')+' football.',
'Un bouquet de fleurs va faire plaisir '+gap('à')+' ma sœur !',
'Vous êtes sûr '+gap('de')+' votre décision ?',
'Nous vous invitons '+gap('à')+' dîner '+gap('chez')+' nous '+gap('—')+' ce samedi. — '+gap('Avec')+' plaisir !',
'Le petit Sébastien apprend '+gap('—')+' le français. Il apprend '+gap('à')+' lire en français.',
'Quand est-ce que tu vas commencer '+gap('à')+' faire ta valise ?',
'Vous croyez '+gap('—')+' ce journaliste ?'
]),note('В пункте 3 le matin относится к названному вторнику; перед mardi и le дополнительного слова не нужно. Croire quelqu’un — верить кому-либо, без предлога.')
]},
{n:17,title:'Cinq messages pour Vincent.',page:150,parts:[
audioNote,note('Écoutez. Cinq personnes laissent leurs messages sur le portable de Vincent. Notez qui laisse le message et ce que Vincent doit faire pour chaque personne.<br>accompagner — проводить, сопровождать.'),
'<div class="table-scroll"><table class="practice-table"><thead><tr><th>Message</th><th>Qui laisse le message ?</th><th>Qu’est-ce que Vincent doit faire ?</th></tr></thead><tbody>'+[1,2,3,4,5].map(n=>'<tr><th>Message '+n+'</th><td>'+blank+'</td><td>'+blank+'</td></tr>').join('')+'</tbody></table></div>'
]},

{n:18,title:'Traduisez.',page:150,parts:[
part('a','Les phrases.',pairs([
['Что можно подарить Лео? Что он любит? — Он обожает машины. Маленькая машинка — прекрасный подарок для него.','Qu’est-ce qu’on peut offrir à Léo ? Qu’est-ce qu’il aime ? — Il adore les voitures. Une petite voiture est un très beau cadeau pour lui.'],
['Яркие цвета сегодня не в моде.','Les couleurs vives ne sont pas à la mode aujourd’hui.'],
['Чем занимается ваш сын? — Он врач.','Qu’est-ce que votre fils fait dans la vie ? — Il est médecin.'],
['Все эти галстуки прекрасны. Я не могу выбрать. Ты можешь мне помочь?','Toutes ces cravates sont très belles. Je ne peux pas choisir. Tu peux m’aider ?'],
['Сколько стоят эти ежедневники? — Один ежедневник стоит 10 €, 3 ежедневника стоят 25 €.','Combien coûtent ces agendas ? — Un agenda coûte dix euros ; trois agendas coûtent vingt-cinq euros.'],
['Чтобы выбрать хороший подарок другу, нужно знать его вкусы.','Pour choisir un bon cadeau à un ami, il faut connaître ses goûts.'],
['Все ждут новую книгу этого писателя. Он должен закончить её летом.','Tout le monde attend le nouveau livre de cet écrivain. Il doit le finir en été.'],
['Это невозможно! Ты всё время опаздываешь! У тебя нет часов? Пойдём, я куплю тебе часы.','C’est impossible ! Tu es tout le temps en retard ! Tu n’as pas de montre ? Viens, je vais t’acheter une montre.'],
['Вы знаете великого французского архитектора Le Corbusier? В Москве есть одно здание этого архитектора. Я вам покажу это здание.','Vous connaissez le grand architecte français Le Corbusier ? À Moscou, il y a un bâtiment de cet architecte. Je vais vous montrer ce bâtiment.'],
['Подождите! Не уходите! Как вас зовут? Вы можете мне дать свой номер телефона? Я вам позвоню.','Attendez ! Ne partez pas ! Comment vous appelez-vous ? Vous pouvez me donner votre numéro de téléphone ? Je vais vous téléphoner.'],
['Изабель ищет тебя, она хочет сказать тебе кое-что интересное.','Isabelle te cherche, elle veut te dire quelque chose d’intéressant.'],
['Это колье интересное, но очень дорогое для меня. — Я думаю, что ты можешь купить Мари платок или часы. Это хороший подарок, он доставит ей удовольствие.','Ce collier est intéressant, mais il est très cher pour moi. — Je crois que tu peux acheter un foulard ou une montre à Marie. C’est un bon cadeau, ça va lui faire plaisir.'],
['Элегантное платье, правда? — Да, но оно слишком классическое. Посмотри эту модель! Мне кажется, что она оригинальная!','Une robe élégante, n’est-ce pas ? — Oui, mais elle est trop classique. Regarde ce modèle ! Je trouve qu’il est original !']
])),
part('b','Les textes et les dialogues.',pairs([
['Если ты хочешь купить что-то оригинальное, сходи в магазин « Beau cadeau ». Там можно найти много интересных вещей. Но это может быть довольно дорого.','Si tu veux acheter quelque chose d’original, va au magasin « Beau cadeau ». On peut y trouver beaucoup de choses intéressantes. Mais ça peut être assez cher.'],
['Мне не нравится Мишель. Он не очень интересный человек, он всё время говорит банальные вещи. — А я нахожу его очень симпатичным. Может быть, он не очень умён, но он милый и весёлый (amusant).','Je n’aime pas Michel. Ce n’est pas une personne très intéressante, il dit tout le temps des choses banales. — Moi, je le trouve très sympathique. Peut-être qu’il n’est pas très intelligent, mais il est gentil et amusant.'],
['Мои родители приглашают нас поужинать у них сегодня вечером. — Очень хорошо, я согласен. — Тогда купи, пожалуйста, цветы для мамы и какую-нибудь интересную книгу для папы.','Mes parents nous invitent à dîner chez eux ce soir. — Très bien, je suis d’accord. — Alors, achète, s’il te plaît, des fleurs pour maman et un livre intéressant pour papa.'],
['Куда ты идёшь? Почему ты спешишь? — Я иду в офис. У меня много работы сегодня. Клиенты меня ждут, я должен им написать, ответить на их письма, подготовить все документы.','Où vas-tu ? Pourquoi es-tu pressé ? — Je vais au bureau. J’ai beaucoup de travail aujourd’hui. Les clients m’attendent, je dois leur écrire, répondre à leurs lettres et préparer tous les documents.'],
['Я надеюсь, что мы увидимся в пятницу, что мы поедем на пляж, погуляем, искупаемся. Мне бы хотелось отдохнуть! Я заеду за тобой в 10, ладно? — Я тоже устала и хочу на море! В 10 мне подходит! Я буду тебя ждать!','J’espère que nous allons nous voir vendredi, que nous allons aller à la plage, nous promener et nous baigner. Je voudrais me reposer ! Je vais venir te chercher à dix heures, d’accord ? — Moi aussi, je suis fatiguée et je veux aller à la mer ! Dix heures, ça me va ! Je vais t’attendre !']
])),note('В пункте 13 un modèle — мужского рода, поэтому il est original. Для будущих действий здесь используется futur proche.')
]},
{n:19,title:'Complétez le texte.',page:151,parts:[
note('Ответы восстановлены по полному диалогу на странице 139.'),
dialogue([
['Vendeuse','Bonjour, monsieur. Est-ce que je peux '+gap('vous aider')+' ?'],
['Marc','Oui, merci, c’est gentil. Je '+gap('voudrais acheter')+' un cadeau.'],
['Vendeuse',gap('Pour qui')+' est ce cadeau ? Pour un homme ou pour une femme ?'],
['Marc','Pour une jeune femme.'],
['Vendeuse','C’est votre femme ? Votre sœur ? Votre collègue ?'],
['Marc','C’est une amie.'],
['Vendeuse','Qu’est-ce qu’elle '+gap('fait dans la vie')+' ? Qu’est-ce qu’elle aime ?'],
['Marc','Elle '+gap('travaille')+' à l’école, mais je '+gap('ne connais pas')+' très bien ses goûts.'],
['Vendeuse','Alors, vous pouvez '+gap('lui offrir')+' un livre ou un agenda.'],
['Marc','Ah non, c’est trop simple et banal. Je suis sûr qu’elle '+gap('a déjà')+' beaucoup '+gap('de livres')+'. Je voudrais quelque chose '+gap('de beau et d’original')+'.'],
['Vendeuse','Je peux vous '+gap('proposer')+' un collier, une '+gap('montre')+', un foulard…'],
['Marc','Oui, un foulard ! Je '+gap('crois')+' que c’est un très bon cadeau.'],
['Vendeuse',gap('Venez')+' avec moi. Je '+gap('vais vous montrer')+' les foulards. Ici, '+gap('j’ai')+' des modèles classiques. Et là, vous '+gap('voyez')+' des foulards très intéressants de couleurs '+gap('vives')+', très '+gap('à la mode')+'. C’est une '+gap('nouvelle')+' collection. Je trouve qu’ils '+gap('sont')+' très jolis. Et ils ne sont pas très '+gap('chers')+'. Je crois que ça '+gap('va faire plaisir à')+' une jeune femme.'],
['Marc','C’est parfait ! Je '+gap('vais lui acheter')+' un foulard.'],
['Vendeuse',gap('Quel')+' modèle est-ce que '+gap('vous préférez')+' ? Regardez : ce foulard bleu est très beau. Et ce modèle jaune avec des '+gap('fleurs')+' est merveilleux. '+gap('Choisissez')+'.'],
['Marc','Je '+gap('vais prendre')+' le foulard jaune, merci. Il '+gap('coûte combien')+' ?'],
['Vendeuse','Il '+gap('coûte')+' 72 €. Vous '+gap('payez')+' comment ? Par carte ou '+gap('en espèces')+' ?'],
['Marc','Par carte. Voilà.'],
['Vendeuse',gap('Attendez')+', monsieur, je '+gap('vous donne')+' un ticket de caisse. Merci beaucoup, monsieur.'],
['Marc','Merci à vous. Bonne soirée.'],
['Vendeuse','Merci, '+gap('bonne soirée à vous')+'.']
])
]}
];

const phonetics = '<details class="lesson-supplement"><summary>Phonétique · упражнения в чтении <span>с. 138</span></summary><div class="supplement-body">'+
note('Прочитайте вслух. Правила, исходное оформление и интонационные упражнения доступны на странице 138 в просмотрщике.')+
part('1','Буквосочетания ai, ei, eu, au, eau, ou, oi, ui','<p lang="fr">Bonheur, souris, rideau, bougie, fuite, salaire, autour, miroir, cheveux, circuit, cauchemar, retraite, coiffure, course, peine, suivre, choix, chaise, douteux, surtout, espoir, rouleau.</p>')+
part('2','Носовые звуки','<p lang="fr">Pencher, complice, chemin, besoin, talent, vilain, argent, plein, synthèse, remplir, moindre, tribun, quotidien, menteur, peintre, songer, envie, instant, torchon, engin, ancien, espion, soudain, menton, thym, humble, sombre, bain, contre, chacun, plaindre, coréen, lointain, lien.</p>')+
part('3','Буква y','<p lang="fr">Voyage, incroyable, balayer, soyeux, tuyau, envoyer, essuyer, moyen, paysage, essayer.</p>')+
part('4','Буква e','<p lang="fr">Résister, deviner, remercier, peluche, respirer, destruction, débuter, réparer, périmètre, reparler, dépêcher, regret, relever, remettre, règle, dépasser, destiner, dessiner, persister.</p>')+
part('5','Числительные','<p lang="fr">2 élèves, 3 étoiles, 6 bouquets, 6 annonces, 8 avocats, 8 cahiers, 9 ans, 9 universités, 10 pièces, 10 hôtels, 18 filles, 18 ordinateurs, 19 articles, 19 heures, 20 fois, 20 écoles, 21 chansons, 23 étudiants, 26 oranges, 28 arbres, 29 euros, 38 lettres, 46 jours, 52 enfants, 66 mètres, 70 acteurs, 80 étages, 81 ans, 82 hommes, 86 avions, 88 mots, 90 pages, 90 ans.</p>')+
part('6','Интонация побудительного предложения',list(['Parlez avec lui !','Faites ces exercices !','Préparez vos affaires !','Regarde par la fenêtre !','Ne pars pas !','Ne sortez pas !','Ouvrez la porte !','Ne commencez pas ! Attendez !']))+
part('7','Интонация вопросительного предложения',list(['Vous aimez danser ? Est-ce que vous aimez danser ?','Tu viens avec nous ? Est-ce que tu viens avec nous ?','Vous jouez au tennis ? Est-ce que vous jouez au tennis ?','Qui est cette jeune fille ?','Qui peut nous aider ?','Qu’est-ce que c’est ? Qu’est-ce que vous faites ?','Avec qui est-ce que vous travaillez ? Vous travaillez avec qui ?','D’où est-ce que vous venez ? Vous venez d’où ?','Quand est-ce que vous partez ? Vous partez quand ?','Combien est-ce que ça coûte ? Ça coûte combien ?','Quelle couleur est-ce que vous préférez ? Vous préférez quelle couleur ?']))+
'</div></details>';

const dialogueQuestions = '<details class="lesson-supplement"><summary>Questions · вопросы к диалогу <span>с. 140</span></summary><div class="supplement-body">'+
part('','Autour du texte.',pairs([
['Pourquoi Marc ne peut pas offrir à Claire un livre ou un agenda ?','Parce qu’il trouve cela trop simple et banal, et il est sûr qu’elle a déjà beaucoup de livres.'],
['Quel cadeau achète Marc ?','Il achète un foulard jaune avec des fleurs.'],
['Pourquoi est-ce que Marc choisit ce cadeau ?','Il veut quelque chose de beau et d’original. Il croit qu’un foulard est un très bon cadeau qui va faire plaisir à Claire.'],
['Combien coûte le cadeau pour Claire ?','Il coûte soixante-douze euros.'],
['Comment est-ce que Marc paye ?','Il paye par carte.']
]))+part('','À vous !',pairs([
['Quel cadeau est-ce qu’on peut offrir à une jeune femme ? à un homme ?','On peut offrir un livre, un parfum, une montre ou un foulard, selon les goûts de la personne.'],
['Comment choisir un bon cadeau ?','Il faut connaître les goûts de la personne et choisir quelque chose qui va lui faire plaisir.'],
['Est-ce que vous aimez choisir votre cadeau ou vous préférez les surprises ?','Je préfère les surprises.'],
['Quel cadeau est-ce que vous voudriez avoir : original, utile, cher, etc. ?','Je voudrais avoir un cadeau utile et original.']
]),'Exemples de réponses personnelles.')+'</div></details>';

const conversation = '<details class="lesson-supplement"><summary>Conversation · jouez les scènes <span>с. 152</span></summary><div class="supplement-body">'+pairs([
['Marc choisit un cadeau de Noël pour sa mère.','— Bonjour, je voudrais acheter un cadeau de Noël pour ma mère.<br>— Qu’est-ce qu’elle aime ?<br>— Elle aime lire. Je voudrais un beau livre.<br>— Regardez ce livre sur la Provence.<br>— Il est très beau. Combien coûte-t-il ?<br>— Vingt-cinq euros.<br>— Je vais le prendre, merci.'],
['Arlette choisit un cadeau pour Fabrice, son frère.','— Je cherche un cadeau pour mon frère Fabrice.<br>— Qu’est-ce qu’il aime ?<br>— Il adore la musique.<br>— Alors, vous pouvez lui offrir des places pour un concert.<br>— C’est une très bonne idée ! Il va être content.'],
['Claire choisit un cadeau pour Marc.','— Bonjour, je voudrais offrir un cadeau à mon ami Marc.<br>— Qu’est-ce qu’il fait dans la vie ?<br>— Il est architecte. Je voudrais quelque chose d’original.<br>— Regardez ce livre sur l’architecture française.<br>— C’est parfait ! Je crois que ça va lui faire plaisir.']
])+'</div></details>';

const names=['Nombres','Prix à Rennes','À la gare · audio','Couleurs','Réponses · COI','Pronoms COI','Questions audio','COD / COI','Séries · pronoms','Impératif','Consignes et conseils','Dialogue audio','Questions','Conjugaison','Quelque chose de…','Prépositions','Messages audio','Traduction','Dialogue à compléter'];
document.querySelector('#exercise-nav').innerHTML=exercises.map((e,i)=>'<a href="#exercise-'+e.n+'"><span>'+String(e.n).padStart(2,'0')+'</span><span>'+names[i]+'</span></a>').join('');
document.querySelector('#exercises').innerHTML=phonetics+dialogueQuestions+exercises.map(e=>'<article class="exercise" id="exercise-'+e.n+'"><div class="exercise-head"><div class="number">'+e.n+'.</div><div class="exercise-heading"><h2>'+e.title+'</h2><a class="source-reference" href="lecon-onze-pages.html#page-'+e.page+'">Учебник · с. '+e.page+' ↗</a></div></div><div class="exercise-body">'+e.parts.join('')+'</div></article>').join('')+conversation;
const revealButtons=[...document.querySelectorAll('.gap,.reveal')];
function setShown(button,shown){button.classList.toggle('shown',shown);button.setAttribute('aria-pressed',String(shown));}
document.querySelector('#exercises').addEventListener('click',event=>{const button=event.target.closest('.gap,.reveal');if(button)setShown(button,!button.classList.contains('shown'));});
document.querySelector('#toggle-all').addEventListener('click',event=>{const show=event.currentTarget.textContent.includes('Показать');revealButtons.forEach(b=>setShown(b,show));event.currentTarget.textContent=show?'Скрыть все ответы':'Показать все ответы';});
const seen=new Set();
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){seen.add(entry.target.id);document.querySelector('#progress').textContent=seen.size+' из '+exercises.length+' упражнений';document.querySelectorAll('#exercise-nav a').forEach(a=>a.classList.toggle('current',a.getAttribute('href')==='#'+entry.target.id));}});},{rootMargin:'-20% 0px -65% 0px'});
document.querySelectorAll('.exercise[id^="exercise-"]').forEach(e=>observer.observe(e));
const menu=document.querySelector('.sidebar'),menuToggle=document.querySelector('#menu-toggle');
menuToggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});
function scrollToExercise(hash){if(!/^#exercise-\d+$/.test(hash))return;requestAnimationFrame(()=>document.querySelector(hash)?.scrollIntoView({behavior:'instant',block:'start'}));}
document.querySelectorAll('#exercise-nav a').forEach(a=>a.addEventListener('click',event=>{event.preventDefault();menu.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');const hash=a.getAttribute('href');history.pushState(null,'',hash);scrollToExercise(hash);}));
window.addEventListener('hashchange',()=>scrollToExercise(location.hash));
window.addEventListener('load',()=>scrollToExercise(location.hash),{once:true});

