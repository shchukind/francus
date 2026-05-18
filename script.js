const state = {
  data: null,
  view: "dictionary",
  dictionaryFilters: new Set(["all"]),
  nounGenderFilter: "all",
  dictionaryVerbTypeFilters: new Set(["all"]),
  serviceTypeFilters: new Set(["all"]),
  verbsTypeFilters: new Set(["all"]),
  grammarTab: "pronouns",
  dictionarySort: "newest",
  verbsSort: "newest",
  calendarTab: "weekdays",
  archivedWords: new Set(),
  query: "",
  genderItem: null,
  genderChecked: false,
  translateItem: null,
  translateMode: "fr-ru",
  translateChecked: false,
  conjugationItem: null,
  conjugationChecked: false
};

const hiddenPhraseTexts = new Set(["le", "la", "l'", "les", "un", "une"]);
const archiveStorageKey = "francus.archivedWords.v1";
const weekdays = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

const titles = {
  dictionary: ["Словарь", "Лексика до печатной страницы 106"],
  verbs: ["Глаголы", "Формы, которые уже появились в учебнике"],
  grammar: ["Грамматика", "Таблицы и конструкции до печатной страницы 106"],
  calendar: ["Календарь", "Дни недели, месяцы и числа"],
  materials: ["Материалы", "Учебник, упражнения и фонетика"],
  "trainer-gender": ["Тренажёр рода", "Выбери un или une"],
  "trainer-translate": ["Тренажёр перевода", "Проверь активный словарь"],
  "trainer-conjugation": ["Тренажёр спряжения", "Введи форму глагола"]
};

const els = {
  title: document.querySelector("#viewTitle"),
  subtitle: document.querySelector("#viewSubtitle"),
  dataSource: document.querySelector("#datasetSource"),
  stats: document.querySelector("#datasetStats"),
  searchWrapper: document.querySelector("#searchWrapper"),
  search: document.querySelector("#searchInput"),
  dictionaryNounGenderFilters: document.querySelector("#dictionaryNounGenderFilters"),
  dictionaryVerbTypeFilters: document.querySelector("#dictionaryVerbTypeFilters"),
  dictionaryServiceTypeFilters: document.querySelector("#dictionaryServiceTypeFilters"),
  archiveOpen: document.querySelector("#archiveOpenBtn"),
  archiveCount: document.querySelector("#archiveCount"),
  archiveModal: document.querySelector("#archiveModal"),
  archiveList: document.querySelector("#archiveList"),
  archiveClear: document.querySelector("#archiveClearBtn"),
  grammarSections: document.querySelector("#grammarSections"),
  calendarGrid: document.querySelector("#calendarGrid"),
  verbsSortFilters: document.querySelector("#verbsSortFilters"),
  verbsTypeFilters: document.querySelector("#verbsTypeFilters"),
  dictionaryRows: document.querySelector("#dictionaryRows"),
  verbCards: document.querySelector("#verbCards"),
  verbModal: document.querySelector("#verbModal"),
  verbModalTitle: document.querySelector("#verbModalTitle"),
  verbModalTranslation: document.querySelector("#verbModalTranslation"),
  verbModalType: document.querySelector("#verbModalType"),
  verbModalForms: document.querySelector("#verbModalForms"),
  genderPrompt: document.querySelector("#genderPrompt"),
  genderTranslation: document.querySelector("#genderTranslation"),
  genderFeedback: document.querySelector("#genderFeedback"),
  translateModeLabel: document.querySelector("#translateModeLabel"),
  translatePrompt: document.querySelector("#translatePrompt"),
  translateInput: document.querySelector("#translateInput"),
  translateFeedback: document.querySelector("#translateFeedback"),
  conjugationHint: document.querySelector("#conjugationHint"),
  conjugationPrompt: document.querySelector("#conjugationPrompt"),
  conjugationInput: document.querySelector("#conjugationInput"),
  conjugationFeedback: document.querySelector("#conjugationFeedback")
};

async function init() {
  const response = await fetch("patouchanska_pages_001_025_dataset.json");
  state.data = await response.json();
  loadArchive();
  enrichVerbForms();
  bindEvents();
  renderAll();
  nextGender();
  nextTranslate();
  nextConjugation();
}

function bindEvents() {
  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  document.querySelectorAll("[data-dictionary-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleMultiFilter(state.dictionaryFilters, button.dataset.dictionaryFilter);
      syncMultiButtons("[data-dictionary-filter]", state.dictionaryFilters);
      renderDictionary();
    });
  });

  document.querySelectorAll("[data-noun-gender-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.nounGenderFilter = button.dataset.nounGenderFilter;
      setActive("[data-noun-gender-filter]", button);
      renderDictionary();
    });
  });

  document.querySelectorAll("[data-dictionary-sort]").forEach((button) => {
    button.addEventListener("click", () => {
      state.dictionarySort = button.dataset.dictionarySort;
      setActive("[data-dictionary-sort]", button);
      renderDictionary();
    });
  });

  document.querySelectorAll("[data-verbs-sort]").forEach((button) => {
    button.addEventListener("click", () => {
      state.verbsSort = button.dataset.verbsSort;
      setActive("[data-verbs-sort]", button);
      renderVerbs();
    });
  });

  document.querySelectorAll("[data-translate-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.translateMode = button.dataset.translateMode;
      setActive("[data-translate-mode]", button);
      nextTranslate();
    });
  });

  document.querySelectorAll("[data-calendar-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.calendarTab = button.dataset.calendarTab;
      setActive("[data-calendar-tab]", button);
      renderCalendar();
    });
  });

  document.querySelectorAll("[data-grammar-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.grammarTab = button.dataset.grammarTab;
      setActive("[data-grammar-tab]", button);
      renderGrammar();
    });
  });

  els.archiveOpen.addEventListener("click", openArchiveModal);
  els.archiveClear.addEventListener("click", restoreAllArchived);
  document.querySelectorAll("[data-close-archive-modal]").forEach((element) => {
    element.addEventListener("click", closeArchiveModal);
  });

  els.search.addEventListener("input", () => {
    state.query = normalizeSearch(els.search.value);
    renderDictionary();
  });

  document.querySelectorAll("[data-gender-answer]").forEach((button) => {
    button.addEventListener("click", () => checkGender(button.dataset.genderAnswer));
  });

  document.querySelector("#nextGenderBtn").addEventListener("click", nextGender);
  document.querySelector("#checkTranslateBtn").addEventListener("click", checkTranslate);
  document.querySelector("#nextTranslateBtn").addEventListener("click", nextTranslate);
  document.querySelector("#checkConjugationBtn").addEventListener("click", checkConjugation);
  document.querySelector("#nextConjugationBtn").addEventListener("click", nextConjugation);
  document.querySelectorAll("[data-close-verb-modal]").forEach((element) => {
    element.addEventListener("click", closeVerbModal);
  });
  document.querySelectorAll('.material-card[href^="/open"]').forEach((card) => {
    card.addEventListener("click", openLocalMaterial);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeVerbModal();
      closeArchiveModal();
    }
    if (event.key === "Enter" && state.view === "trainer-gender" && state.genderChecked) {
      event.preventDefault();
      nextGender();
    }
  });

  els.translateInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleTranslateEnter();
    }
  });
  els.conjugationInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleConjugationEnter();
    }
  });
}

function handleTranslateEnter() {
  if (state.translateChecked) {
    nextTranslate();
  } else {
    checkTranslate();
  }
}

function handleConjugationEnter() {
  if (state.conjugationChecked) {
    nextConjugation();
  } else {
    checkConjugation();
  }
}

function setView(view) {
  state.view = view;
  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === view);
  });
  document.querySelectorAll(".view").forEach((section) => {
    section.classList.remove("is-active");
  });
  document.querySelector(`#${toViewId(view)}`).classList.add("is-active");
  els.title.textContent = titles[view][0];
  els.subtitle.textContent = titles[view][1];
  els.searchWrapper.hidden = view !== "dictionary";
}

function toViewId(view) {
  return {
    dictionary: "dictionaryView",
    verbs: "verbsView",
    grammar: "grammarView",
    calendar: "calendarView",
    materials: "materialsView",
    "trainer-gender": "trainerGenderView",
    "trainer-translate": "trainerTranslateView",
    "trainer-conjugation": "trainerConjugationView"
  }[view];
}

function renderAll() {
  renderStats();
  renderFilterOptions();
  renderDictionary();
  renderVerbs();
  renderGrammar();
  renderCalendar();
  renderArchiveCount();
}

function renderStats() {
  const { nouns, verbs, adjectives, function_words_and_phrases: phrases } = state.data;
  const activeNouns = nouns.filter((item) => !isCalendarNoun(item) && !state.archivedWords.has(itemKey("noun", item.lemma)));
  const activeVerbs = verbs.filter((item) => !state.archivedWords.has(itemKey("verb", item.infinitive)));
  const activeAdjectives = adjectives.filter((item) => !state.archivedWords.has(itemKey("adjective", item.lemma)));
  const visiblePhrases = phrases.filter((item) => !hiddenPhraseTexts.has(item.text) && !isCalendarPhrase(item) && !isPronounPhrase(item) && !state.archivedWords.has(itemKey("phrase", item.text)));
  const pageMatch = String(state.data.metadata?.printed_pages_used || "").match(/(\d+)\s*$/);
  const pageLabel = pageMatch ? `до стр. ${pageMatch[1]}` : "текущая база";
  els.dataSource.textContent = `Учебник Потушанской · ${pageLabel}`;
  els.stats.innerHTML = `
    <div>${activeNouns.length} существительных</div>
    <div>${activeVerbs.length} глаголов</div>
    <div>${activeAdjectives.length} прилагательных</div>
    <div>${visiblePhrases.length} служебных слов и фраз</div>
  `;
}

function dictionaryItems() {
  const data = state.data;
  return [
    ...data.nouns.filter((item) => !isCalendarNoun(item)).map((item, index) => ({
      kind: "noun",
      key: itemKey("noun", item.lemma),
      fr: item.lemma,
      form: nounFormLabel(item),
      translation: item.translation_ru,
      page: item.printed_page,
      tagClass: item.gender,
      typeTag: "сущ.",
      gender: item.gender,
      sortKey: item.lemma,
      order: index
    })),
    ...data.verbs.map((item, index) => ({
      kind: "verb",
      key: itemKey("verb", item.infinitive),
      fr: item.infinitive,
      form: verbFormLabel(item),
      translation: item.translation_ru,
      page: pages(item),
      tagClass: "plain",
      typeTag: "глаг.",
      rawType: conjugationGroup(item),
      sortKey: item.infinitive,
      order: data.nouns.length + index,
      verb: item
    })),
    ...data.adjectives.map((item, index) => ({
      kind: "adjective",
      key: itemKey("adjective", item.lemma),
      fr: item.lemma,
      feminine: item.feminine,
      form: "прилагательное",
      translation: item.translation_ru,
      page: pages(item),
      tagClass: "plain",
      typeTag: "прил.",
      sortKey: item.lemma,
      order: data.nouns.length + data.verbs.length + index
    })),
    ...data.function_words_and_phrases.filter((item) => !hiddenPhraseTexts.has(item.text) && !isCalendarPhrase(item) && !isPronounPhrase(item)).map((item, index) => ({
      kind: "phrase",
      key: itemKey("phrase", item.text),
      fr: item.text,
      form: phraseTypeLabel(item.type),
      translation: item.translation_ru,
      page: pages(item),
      tagClass: "plain",
      typeTag: phraseKindLabel(item.type, item),
      serviceType: serviceType(item.type, item),
      sortKey: item.text,
      order: data.nouns.length + data.verbs.length + data.adjectives.length + index
    }))
  ].filter((item) => !state.archivedWords.has(item.key));
}

function renderFilterOptions() {
  const groups = conjugationGroups();
  els.dictionaryVerbTypeFilters.innerHTML = renderGroupButtons(groups, "dictionary-verb-type-filter", state.dictionaryVerbTypeFilters);
  els.verbsTypeFilters.innerHTML = renderGroupButtons(groups, "verbs-type-filter", state.verbsTypeFilters);
  els.dictionaryServiceTypeFilters.innerHTML = renderServiceTypeButtons();

  els.dictionaryVerbTypeFilters.querySelectorAll("[data-dictionary-verb-type-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleMultiFilter(state.dictionaryVerbTypeFilters, button.dataset.dictionaryVerbTypeFilter);
      syncMultiButtons("[data-dictionary-verb-type-filter]", state.dictionaryVerbTypeFilters);
      renderDictionary();
    });
  });

  els.verbsTypeFilters.querySelectorAll("[data-verbs-type-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleMultiFilter(state.verbsTypeFilters, button.dataset.verbsTypeFilter);
      syncMultiButtons("[data-verbs-type-filter]", state.verbsTypeFilters);
      renderVerbs();
    });
  });

  els.dictionaryServiceTypeFilters.querySelectorAll("[data-service-type-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleMultiFilter(state.serviceTypeFilters, button.dataset.serviceTypeFilter);
      syncMultiButtons("[data-service-type-filter]", state.serviceTypeFilters);
      renderDictionary();
    });
  });
}

function renderDictionary() {
  const rows = dictionaryItems()
    .filter((item) => state.dictionaryFilters.has("all") || state.dictionaryFilters.has(item.kind))
    .filter((item) => {
      if (item.kind === "noun" && state.nounGenderFilter !== "all") return item.gender === state.nounGenderFilter;
      if (item.kind === "verb" && !state.dictionaryVerbTypeFilters.has("all")) return state.dictionaryVerbTypeFilters.has(item.rawType);
      if (item.kind === "phrase" && !state.serviceTypeFilters.has("all")) return state.serviceTypeFilters.has(item.serviceType);
      return true;
    })
    .filter((item) => {
      if (!state.query) return true;
      return normalizeSearch([item.fr, item.translation, item.form, item.page].join(" ")).includes(state.query);
    })
    .sort(compareDictionaryItems)
    .map((item) => `
      <tr class="row-${item.kind} ${item.gender ? `row-${item.gender}` : ""} ${item.serviceType ? `row-service-${item.serviceType}` : ""}">
        <td class="cell-word">${dictionaryWordCell(item)}</td>
        <td class="cell-type"><span class="tag ${item.tagClass} tag-${item.kind} ${item.serviceType ? `tag-service-${item.serviceType}` : ""}">${item.typeTag}</span></td>
        <td class="cell-translation">${escapeHtml(item.translation || "")}</td>
        <td class="cell-form">${escapeHtml(item.form || "")}</td>
        <td class="cell-page">${escapeHtml(String(item.page || ""))}</td>
        <td class="cell-action"><button class="hide-word-btn" type="button" data-archive-word="${escapeHtml(item.key)}" aria-label="Скрыть ${escapeHtml(item.fr)}">×</button></td>
      </tr>
    `)
    .join("");

  els.dictionaryRows.innerHTML = rows || `<tr><td colspan="6">Ничего не найдено</td></tr>`;
  els.dictionaryRows.querySelectorAll("[data-dictionary-verb]").forEach((button) => {
    const verb = state.data.verbs.find((item) => item.infinitive === button.dataset.dictionaryVerb);
    button.addEventListener("click", () => openVerbModal(verb));
  });
  els.dictionaryRows.querySelectorAll("[data-archive-word]").forEach((button) => {
    button.addEventListener("click", () => archiveWord(button.dataset.archiveWord));
  });
  els.dictionaryNounGenderFilters.hidden = !state.dictionaryFilters.has("noun");
  els.dictionaryVerbTypeFilters.hidden = !state.dictionaryFilters.has("verb");
  els.dictionaryServiceTypeFilters.hidden = !state.dictionaryFilters.has("phrase");
}

function renderVerbs() {
  const verbs = state.data.verbs
    .filter((verb) => !state.archivedWords.has(itemKey("verb", verb.infinitive)))
    .filter((verb) => state.verbsTypeFilters.has("all") || state.verbsTypeFilters.has(conjugationGroup(verb)))
    .sort(compareVerbItems);
  els.verbCards.innerHTML = verbs.map((verb, index) => `
    <article class="verb-card" data-verb-card="${escapeHtml(verb.infinitive)}" tabindex="0">
      <div class="verb-head">
        <div>
          <h3>${escapeHtml(verb.infinitive)}</h3>
          <div class="verb-translation">${escapeHtml(verb.translation_ru)}</div>
        </div>
        <div class="verb-badges">${renderVerbBadges(verb)}</div>
      </div>
      <div class="forms">
        ${renderVerbForms(verb)}
      </div>
    </article>
  `).join("") || `<div class="empty">Глаголов с таким типом пока нет</div>`;

  els.verbCards.querySelectorAll("[data-verb-card]").forEach((card) => {
    const verb = verbs.find((item) => item.infinitive === card.dataset.verbCard);
    card.addEventListener("click", () => openVerbModal(verb));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openVerbModal(verb);
      }
    });
  });
}

function renderGrammar() {
  const groups = grammarTables();
  els.grammarSections.innerHTML = groups.map((group) => `
    <section class="pronoun-section">
      <div class="pronoun-section-head">
        <h3>${escapeHtml(group.title)}</h3>
        <span>${escapeHtml(group.note)}</span>
      </div>
      <div class="pronoun-table-wrap">
        <table class="pronoun-table pronoun-table-${group.columns.length}">
          <thead>
            <tr>
              ${group.columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${group.rows.map((row) => renderPronounRow(row, group.columns.length)).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `).join("");
}

function grammarTables() {
  const tables = {
    pronouns: pronounTables,
    adjectives: adjectiveGrammarTables,
    questions: questionGrammarTables,
    time: timeGrammarTables,
    constructions: constructionGrammarTables
  };

  return (tables[state.grammarTab] || pronounTables)();
}

function pronounTables() {
  return [
    personalPronounTable(),
    objectPronounOrderTable(),
    reflexivePronounOrderTable(),
    possessivePronounTable(),
    demonstrativePronounTable(),
    compactPronounList("Прочие местоимения", "из словаря", [
      ["moi", "я; меня; мне"],
      ["toi", "ты; тебя; тебе"],
      ["lui", "он; ему"],
      ["tous", "все"],
      ["quelqu'un", "кто-нибудь"]
    ])
  ];
}

function personalPronounTable() {
  return {
    title: "Личные приглагольные местоимения",
    note: "таблица",
    columns: ["Лицо", "Подлежащее", "Прямое дополнение", "Косвенное дополнение"],
    rows: [
      sectionRow("Единственное число", 4),
      ["1-е", strong("je"), strong("me"), strong("me")],
      ["2-е", strong("tu"), strong("te"), strong("te")],
      ["3-е", `${strong("il")}<br>${strong("elle")}`, `${strong("le")} <span class="pronoun-note">(муж.)</span><br>${strong("la")} <span class="pronoun-note">(жен.)</span>`, `${strong("lui")} <span class="pronoun-note">(муж.)</span><br>${strong("lui")} <span class="pronoun-note">(жен.)</span>`],
      sectionRow("Множественное число", 4),
      ["1-е", strong("nous"), strong("nous"), strong("nous")],
      ["2-е", strong("vous"), strong("vous"), strong("vous")],
      ["3-е", `${strong("ils")}<br>${strong("elles")}`, strong("les"), strong("leur")]
    ]
  };
}

function objectPronounOrderTable() {
  return {
    title: "Порядок приглагольных местоимений",
    note: "me, te, le, lui",
    columns: ["Тип фразы", "Схема", "Пример"],
    rows: [
      ["Утверждение", `${strong("подл. + местоим. + глагол")}`, `${strong("je le lis")} - я это читаю`],
      ["Отрицание", `${strong("ne + местоим. + глагол + pas")}`, `${strong("je ne le lis pas")} - я это не читаю`],
      ["Вопрос", `${strong("местоим. + глагол-связка")}`, `${strong("le lit-elle ?")} - она это читает?`],
      ["Приказ, утв.", `${strong("глагол + местоим.")}`, `${strong("lis-le")} - прочитай это`],
      ["Приказ, отриц.", `${strong("ne + местоим. + глагол + pas")}`, `${strong("ne le lis pas")} - не читай это`]
    ]
  };
}

function reflexivePronounOrderTable() {
  return {
    title: "Возвратные глаголы",
    note: "se lever",
    columns: ["Тип фразы", "Схема", "Пример"],
    rows: [
      ["Формы", `${strong("me, te, se, nous, vous, se")}`, `${strong("je me lève")} / ${strong("nous nous levons")}`],
      ["Утверждение", `${strong("подл. + возвратн. + глагол")}`, `${strong("elle se lève")} - она встаёт`],
      ["Отрицание", `${strong("ne + возвратн. + глагол + pas")}`, `${strong("elle ne se lève pas")} - она не встаёт`],
      ["Вопрос", `${strong("возвратн. + глагол-связка")}`, `${strong("se lève-t-elle ?")} - она встаёт?`],
      ["Приказ, утв.", `${strong("глагол + toi/nous/vous")}`, `${strong("lève-toi")} - встань`],
      ["Приказ, отриц.", `${strong("ne + te/nous/vous + глагол + pas")}`, `${strong("ne te lève pas")} - не вставай`]
    ]
  };
}

function possessivePronounTable() {
  return {
    title: "Притяжательные прилагательные",
    note: "mon, ma, mes",
    columns: ["Лицо", "Муж. ед.", "Жен. ед.", "Мн. число"],
    rows: [
      ["1-е ед.", strong("mon"), strong("ma"), strong("mes")],
      ["2-е ед.", strong("ton"), strong("ta"), strong("tes")],
      ["3-е ед.", strong("son"), strong("sa"), strong("ses")],
      ["1-е мн.", strong("notre"), strong("notre"), strong("nos")],
      ["2-е мн.", strong("votre"), strong("votre"), strong("vos")],
      ["3-е мн.", strong("leur"), strong("leur"), strong("leurs")]
    ]
  };
}

function demonstrativePronounTable() {
  return {
    title: "Указательные прилагательные",
    note: "ce, cette",
    columns: ["Муж. ед.", "Жен. ед.", "Перед гласной", "Мн. число"],
    rows: [
      [strong("ce"), strong("cette"), `<span class="muted-cell">cet</span>`, `<span class="muted-cell">ces</span>`]
    ]
  };
}

function adjectiveGrammarTables() {
  return [
    {
      title: "Женский род прилагательных",
      note: "основные модели",
      columns: ["Муж.", "Жен.", "Значение"],
      rows: [
        [strong("grand"), strong("grande"), "большой"],
        [strong("joli"), strong("jolie"), "хорошенький"],
        [strong("jeune"), strong("jeune"), "молодой"],
        [strong("gentil"), strong("gentille"), "милый"],
        [strong("bleu"), strong("bleue"), "синий"],
        [strong("bon"), strong("bonne"), "хороший; вкусный"],
        [strong("nouveau"), strong("nouvelle"), "новый"],
        [strong("beau"), strong("belle"), "красивый; хороший"],
        [strong("vieux"), strong("vieille"), "старый"]
      ]
    },
    {
      title: "Неопределённое прилагательное tout",
      note: "tout, toute, tous, toutes",
      columns: ["Число", "Муж.", "Жен."],
      rows: [
        ["Ед.", strong("tout"), strong("toute")],
        ["Мн.", strong("tous"), strong("toutes")]
      ]
    },
    compactPronounList("Примеры с tout", "из уроков", [
      ["tout le groupe", "вся группа"],
      ["toute la famille", "вся семья"],
      ["tous les livres", "все книги"],
      ["toutes les revues", "все журналы"]
    ])
  ];
}

function questionGrammarTables() {
  return [
    compactPronounList("Вопросительные слова", "qui, que, où", [
      ["qui ?", "кто?"],
      ["que ?", "что?"],
      ["où ?", "где? куда?"],
      ["comment ?", "как? каков?"],
      ["pourquoi ?", "почему?"],
      ["quand ?", "когда?"],
      ["combien ?", "сколько?"],
      ["quelle heure est-il ?", "который час?"]
    ]),
    compactPronounList("Вопросительные конструкции", "из таблиц и примеров", [
      ["qu'est-ce que c'est ?", "что это?"],
      ["n'est-ce pas ?", "не правда ли?"],
      ["se lève-t-elle ?", "она встаёт?"],
      ["ont-ils ?", "у них есть?"],
      ["peut-elle ?", "она может?"]
    ])
  ];
}

function timeGrammarTables() {
  return [
    compactPronounList("Время на часах", "устойчивые модели", [
      ["il est une heure", "один час"],
      ["il est deux heures", "два часа"],
      ["et demie", "половина"],
      ["et quart", "четверть после"],
      ["moins le quart", "без четверти"]
    ]),
    compactPronounList("Выражения времени", "без дней недели", [
      ["aujourd'hui", "сегодня"],
      ["demain", "завтра"],
      ["chaque jour", "каждый день"],
      ["vingt minutes plus tard", "двадцать минут спустя"],
      ["ce jour-là", "в тот день"],
      ["de nouveau", "снова"]
    ])
  ];
}

function constructionGrammarTables() {
  return [
    compactPronounList("Ближайшее будущее", "aller + infinitif", [
      ["je vais lire", "я сейчас буду читать"],
      ["nous allons faire", "мы собираемся сделать"],
      ["ils vont partir", "они собираются уехать"]
    ]),
    compactPronounList("Безличные и погодные конструкции", "il faut, il fait", [
      ["il faut + infinitif", "нужно сделать что-либо"],
      ["il fait chaud", "жарко"],
      ["il fait beau", "хорошая погода"],
      ["il fait froid", "холодно"],
      ["il fait mauvais", "плохая погода"],
      ["il fait doux", "мягкая погода"]
    ]),
    compactPronounList("Управление и инфинитив", "частотные модели", [
      ["parler à", "говорить кому-либо"],
      ["parler de", "говорить о чём-либо"],
      ["jouer de la guitare", "играть на гитаре"],
      ["demander à qn de faire qch", "попросить кого-либо сделать что-либо"],
      ["donner qch à qn", "дать что-либо кому-либо"],
      ["refuser de faire qch", "отказаться сделать что-либо"],
      ["sans + infinitif", "не делая чего-либо"],
      ["faire connaissance avec qn", "познакомиться с кем-либо"],
      ["être tiré de", "быть взятым из"],
      ["aller chercher qn/qch", "пойти за кем-либо/чем-либо"]
    ])
  ];
}

function compactPronounList(title, note, items) {
  return {
    title,
    note,
    columns: ["Форма", "Перевод"],
    rows: items.map(([fr, ru]) => [strong(fr), escapeHtml(ru)])
  };
}

function sectionRow(title, columns) {
  return { section: title, columns };
}

function strong(value) {
  return `<strong>${escapeHtml(value)}</strong>`;
}

function renderPronounRow(row, columns) {
  if (row.section) {
    return `
      <tr class="pronoun-section-row">
        <td colspan="${columns}">${escapeHtml(row.section)}</td>
      </tr>
    `;
  }
  return `
    <tr>
      ${row.map((cell) => `<td>${cell}</td>`).join("")}
    </tr>
  `;
}

function renderCalendar() {
  const items = calendarItems()[state.calendarTab] || [];
  els.calendarGrid.innerHTML = items.map((item) => `
    <article class="calendar-card calendar-${item.group}">
      <div class="calendar-word">${escapeHtml(item.fr)}</div>
      <div class="calendar-translation">${escapeHtml(item.translation)}</div>
      <div class="calendar-meta">${escapeHtml(item.meta)}</div>
    </article>
  `).join("") || `<div class="empty">Пока пусто</div>`;
}

function calendarItems() {
  const nounByLemma = new Map(state.data.nouns.map((item) => [item.lemma, item]));
  const phraseByText = new Map(state.data.function_words_and_phrases.map((item) => [item.text, item]));
  const weekdayItems = weekdays
    .map((day) => nounByLemma.get(day) || phraseByText.get(day))
    .filter(Boolean)
    .map((item) => ({
      group: "weekday",
      fr: item.lemma || item.text,
      translation: item.translation_ru,
      meta: pages(item) ? `стр. ${pages(item)}` : "день недели"
    }));
  const monthItems = state.data.function_words_and_phrases
    .filter((item) => item.type === "month")
    .map((item) => ({
      group: "month",
      fr: item.text,
      translation: item.translation_ru,
      meta: pages(item) ? `стр. ${pages(item)}` : "месяц"
    }));
  const numberItems = state.data.function_words_and_phrases
    .filter((item) => item.type === "numeral")
    .map((item) => ({
      group: "number",
      fr: item.text,
      translation: item.translation_ru,
      meta: pages(item) ? `стр. ${pages(item)}` : "числительное"
    }));
  return {
    weekdays: weekdayItems,
    months: monthItems,
    numbers: numberItems
  };
}

function nextGender() {
  const items = state.data.nouns.filter((noun) => (
    (noun.indefinite_article === "un" || noun.indefinite_article === "une") &&
    !isCalendarNoun(noun) &&
    !state.archivedWords.has(itemKey("noun", noun.lemma))
  ));
  state.genderItem = sample(items);
  state.genderChecked = false;
  els.genderPrompt.textContent = `___ ${state.genderItem.lemma}`;
  els.genderTranslation.textContent = state.genderItem.translation_ru;
  setFeedback(els.genderFeedback, "");
}

function checkGender(answer) {
  const correct = state.genderItem.indefinite_article;
  const ok = answer === correct;
  state.genderChecked = true;
  setFeedback(
    els.genderFeedback,
    ok ? `Верно: ${correct} ${state.genderItem.lemma}` : `Почти. Правильно: ${correct} ${state.genderItem.lemma}`,
    ok
  );
}

function nextTranslate() {
  const items = [
    ...state.data.nouns
      .filter((item) => !isCalendarNoun(item) && !state.archivedWords.has(itemKey("noun", item.lemma)))
      .map((item) => ({ fr: displayNoun(item), ru: item.translation_ru })),
    ...state.data.verbs
      .filter((item) => !state.archivedWords.has(itemKey("verb", item.infinitive)))
      .map((item) => ({ fr: item.infinitive, ru: item.translation_ru })),
    ...state.data.adjectives
      .filter((item) => !state.archivedWords.has(itemKey("adjective", item.lemma)))
      .map((item) => ({ fr: item.lemma, ru: item.translation_ru }))
  ];
  state.translateItem = sample(items);
  state.translateChecked = false;
  els.translateModeLabel.textContent = state.translateMode === "fr-ru" ? "Французский → русский" : "Русский → французский";
  els.translatePrompt.textContent = state.translateMode === "fr-ru" ? state.translateItem.fr : state.translateItem.ru;
  els.translateInput.value = "";
  setFeedback(els.translateFeedback, "");
  els.translateInput.focus();
}

function checkTranslate() {
  const expected = state.translateMode === "fr-ru" ? state.translateItem.ru : state.translateItem.fr;
  const user = els.translateInput.value;
  const accepted = expected.split(";").map((value) => value.trim()).filter(Boolean);
  const strictOk = accepted.some((value) => strictNormalize(user) === strictNormalize(value));
  const looseOk = accepted.some((value) => looseNormalize(user) === looseNormalize(value));

  if (strictOk) {
    setFeedback(els.translateFeedback, `Верно: ${expected}`, true);
  } else if (looseOk) {
    setFeedback(els.translateFeedback, `Верно, но обратите внимание на акценты и французское написание: ${expected}`, true);
  } else {
    setFeedback(els.translateFeedback, `Ответ: ${expected}`, false);
  }
  state.translateChecked = true;
}

function nextConjugation() {
  const forms = state.data.verbs.filter((verb) => !state.archivedWords.has(itemKey("verb", verb.infinitive))).flatMap((verb) => {
    return Object.entries(verb.forms).map(([pronoun, form]) => ({ verb, pronoun, form }));
  });
  state.conjugationItem = sample(forms);
  state.conjugationChecked = false;
  els.conjugationHint.textContent = `${state.conjugationItem.verb.infinitive} — ${state.conjugationItem.verb.translation_ru}`;
  els.conjugationPrompt.textContent = `${state.conjugationItem.pronoun} ___`;
  els.conjugationInput.value = "";
  setFeedback(els.conjugationFeedback, "");
  els.conjugationInput.focus();
}

function enrichVerbForms() {
  state.data.verbs.forEach((verb) => {
    verb.forms = completePresentForms(verb);
  });
}

function completePresentForms(verb) {
  const pronominal = (forms) => ({
    "je": `${startsWithVowel(forms.je) ? "m'" : "me "}${forms.je}`,
    "tu": `${startsWithVowel(forms.tu) ? "t'" : "te "}${forms.tu}`,
    "il/elle": `${startsWithVowel(forms["il/elle"]) ? "s'" : "se "}${forms["il/elle"]}`,
    "nous": `nous ${forms.nous}`,
    "vous": `vous ${forms.vous}`,
    "ils/elles": `${startsWithVowel(forms["ils/elles"]) ? "s'" : "se "}${forms["ils/elles"]}`
  });

  const known = {
    "être": { "je": "suis", "tu": "es", "il/elle": "est", "nous": "sommes", "vous": "êtes", "ils/elles": "sont" },
    "avoir": { "je": "ai", "tu": "as", "il/elle": "a", "nous": "avons", "vous": "avez", "ils/elles": "ont" },
    "aller": { "je": "vais", "tu": "vas", "il/elle": "va", "nous": "allons", "vous": "allez", "ils/elles": "vont" },
    "faire": { "je": "fais", "tu": "fais", "il/elle": "fait", "nous": "faisons", "vous": "faites", "ils/elles": "font" },
    "lire": { "je": "lis", "tu": "lis", "il/elle": "lit", "nous": "lisons", "vous": "lisez", "ils/elles": "lisent" },
    "partir": { "je": "pars", "tu": "pars", "il/elle": "part", "nous": "partons", "vous": "partez", "ils/elles": "partent" },
    "savoir": { "je": "sais", "tu": "sais", "il/elle": "sait", "nous": "savons", "vous": "savez", "ils/elles": "savent" },
    "répéter": { "je": "répète", "tu": "répètes", "il/elle": "répète", "nous": "répétons", "vous": "répétez", "ils/elles": "répètent" },
    "céder": { "je": "cède", "tu": "cèdes", "il/elle": "cède", "nous": "cédons", "vous": "cédez", "ils/elles": "cèdent" },
    "sécher": { "je": "sèche", "tu": "sèches", "il/elle": "sèche", "nous": "séchons", "vous": "séchez", "ils/elles": "sèchent" },
    "déménager": { "je": "déménage", "tu": "déménages", "il/elle": "déménage", "nous": "déménageons", "vous": "déménagez", "ils/elles": "déménagent" },
    "rire": { "je": "ris", "tu": "ris", "il/elle": "rit", "nous": "rions", "vous": "riez", "ils/elles": "rient" },
    "dire": { "je": "dis", "tu": "dis", "il/elle": "dit", "nous": "disons", "vous": "dites", "ils/elles": "disent" },
    "venir": { "je": "viens", "tu": "viens", "il/elle": "vient", "nous": "venons", "vous": "venez", "ils/elles": "viennent" },
    "apprendre": { "je": "apprends", "tu": "apprends", "il/elle": "apprend", "nous": "apprenons", "vous": "apprenez", "ils/elles": "apprennent" },
    "comprendre": { "je": "comprends", "tu": "comprends", "il/elle": "comprend", "nous": "comprenons", "vous": "comprenez", "ils/elles": "comprennent" },
    "prendre": { "je": "prends", "tu": "prends", "il/elle": "prend", "nous": "prenons", "vous": "prenez", "ils/elles": "prennent" },
    "écrire": { "je": "écris", "tu": "écris", "il/elle": "écrit", "nous": "écrivons", "vous": "écrivez", "ils/elles": "écrivent" },
    "répondre": { "je": "réponds", "tu": "réponds", "il/elle": "répond", "nous": "répondons", "vous": "répondez", "ils/elles": "répondent" },
    "revenir": { "je": "reviens", "tu": "reviens", "il/elle": "revient", "nous": "revenons", "vous": "revenez", "ils/elles": "reviennent" },
    "relire": { "je": "relis", "tu": "relis", "il/elle": "relit", "nous": "relisons", "vous": "relisez", "ils/elles": "relisent" },
    "servir": { "je": "sers", "tu": "sers", "il/elle": "sert", "nous": "servons", "vous": "servez", "ils/elles": "servent" },
    "commencer": { "je": "commence", "tu": "commences", "il/elle": "commence", "nous": "commençons", "vous": "commencez", "ils/elles": "commencent" },
    "vouloir": { "je": "veux", "tu": "veux", "il/elle": "veut", "nous": "voulons", "vous": "voulez", "ils/elles": "veulent" },
    "pouvoir": { "je": "peux", "tu": "peux", "il/elle": "peut", "nous": "pouvons", "vous": "pouvez", "ils/elles": "peuvent" },
    "voir": { "je": "vois", "tu": "vois", "il/elle": "voit", "nous": "voyons", "vous": "voyez", "ils/elles": "voient" },
    "mettre": { "je": "mets", "tu": "mets", "il/elle": "met", "nous": "mettons", "vous": "mettez", "ils/elles": "mettent" },
    "perdre": { "je": "perds", "tu": "perds", "il/elle": "perd", "nous": "perdons", "vous": "perdez", "ils/elles": "perdent" },
    "devoir": { "je": "dois", "tu": "dois", "il/elle": "doit", "nous": "devons", "vous": "devez", "ils/elles": "doivent" },
    "ouvrir": { "je": "ouvre", "tu": "ouvres", "il/elle": "ouvre", "nous": "ouvrons", "vous": "ouvrez", "ils/elles": "ouvrent" },
    "courir": { "je": "cours", "tu": "cours", "il/elle": "court", "nous": "courons", "vous": "courez", "ils/elles": "courent" },
    "attendre": { "je": "attends", "tu": "attends", "il/elle": "attend", "nous": "attendons", "vous": "attendez", "ils/elles": "attendent" },
    "entendre": { "je": "entends", "tu": "entends", "il/elle": "entend", "nous": "entendons", "vous": "entendez", "ils/elles": "entendent" },
    "manger": { "je": "mange", "tu": "manges", "il/elle": "mange", "nous": "mangeons", "vous": "mangez", "ils/elles": "mangent" },
    "préférer": { "je": "préfère", "tu": "préfères", "il/elle": "préfère", "nous": "préférons", "vous": "préférez", "ils/elles": "préfèrent" },
    "interpréter": { "je": "interprète", "tu": "interprètes", "il/elle": "interprète", "nous": "interprétons", "vous": "interprétez", "ils/elles": "interprètent" },
    "promener": { "je": "promène", "tu": "promènes", "il/elle": "promène", "nous": "promenons", "vous": "promenez", "ils/elles": "promènent" },
    "se lever": pronominal({ "je": "lève", "tu": "lèves", "il/elle": "lève", "nous": "levons", "vous": "levez", "ils/elles": "lèvent" }),
    "se coucher": pronominal({ "je": "couche", "tu": "couches", "il/elle": "couche", "nous": "couchons", "vous": "couchez", "ils/elles": "couchent" }),
    "se réveiller": pronominal({ "je": "réveille", "tu": "réveilles", "il/elle": "réveille", "nous": "réveillons", "vous": "réveillez", "ils/elles": "réveillent" }),
    "se promener": pronominal({ "je": "promène", "tu": "promènes", "il/elle": "promène", "nous": "promenons", "vous": "promenez", "ils/elles": "promènent" }),
    "s'arrêter": pronominal({ "je": "arrête", "tu": "arrêtes", "il/elle": "arrête", "nous": "arrêtons", "vous": "arrêtez", "ils/elles": "arrêtent" }),
    "s'installer": pronominal({ "je": "installe", "tu": "installes", "il/elle": "installe", "nous": "installons", "vous": "installez", "ils/elles": "installent" }),
    "s'amuser": pronominal({ "je": "amuse", "tu": "amuses", "il/elle": "amuse", "nous": "amusons", "vous": "amusez", "ils/elles": "amusent" }),
    "se passer": pronominal({ "je": "passe", "tu": "passes", "il/elle": "passe", "nous": "passons", "vous": "passez", "ils/elles": "passent" }),
    "s'habiller": pronominal({ "je": "habille", "tu": "habilles", "il/elle": "habille", "nous": "habillons", "vous": "habillez", "ils/elles": "habillent" }),
    "se déshabiller": pronominal({ "je": "déshabille", "tu": "déshabilles", "il/elle": "déshabille", "nous": "déshabillons", "vous": "déshabillez", "ils/elles": "déshabillent" }),
    "se dépêcher": pronominal({ "je": "dépêche", "tu": "dépêches", "il/elle": "dépêche", "nous": "dépêchons", "vous": "dépêchez", "ils/elles": "dépêchent" }),
    "se laver": pronominal({ "je": "lave", "tu": "laves", "il/elle": "lave", "nous": "lavons", "vous": "lavez", "ils/elles": "lavent" }),
    "se baigner": pronominal({ "je": "baigne", "tu": "baignes", "il/elle": "baigne", "nous": "baignons", "vous": "baignez", "ils/elles": "baignent" }),
    "se réunir": pronominal({ "je": "réunis", "tu": "réunis", "il/elle": "réunit", "nous": "réunissons", "vous": "réunissez", "ils/elles": "réunissent" }),
    "se raser": pronominal({ "je": "rase", "tu": "rases", "il/elle": "rase", "nous": "rasons", "vous": "rasez", "ils/elles": "rasent" }),
    "s'ouvrir": pronominal({ "je": "ouvre", "tu": "ouvres", "il/elle": "ouvre", "nous": "ouvrons", "vous": "ouvrez", "ils/elles": "ouvrent" }),
    "se refermer": pronominal({ "je": "referme", "tu": "refermes", "il/elle": "referme", "nous": "refermons", "vous": "refermez", "ils/elles": "referment" }),
    "falloir": { "il/elle": "faut" },
    "pleuvoir": { "il/elle": "pleut" }
  };

  if (known[verb.infinitive]) return known[verb.infinitive];

  if (verb.infinitive === "s'appeler") {
    return {
      "je": "m'appelle",
      "tu": "t'appelles",
      "il/elle": "s'appelle",
      "nous": "nous appelons",
      "vous": "vous appelez",
      "ils/elles": "s'appellent"
    };
  }

  if (verb.infinitive === "acheter") {
    return {
      "je": "achète",
      "tu": "achètes",
      "il/elle": "achète",
      "nous": "achetons",
      "vous": "achetez",
      "ils/elles": "achètent"
    };
  }

  if (conjugationGroup(verb) === "group-2" && verb.infinitive.endsWith("ir")) {
    const stem = verb.infinitive.slice(0, -2);
    return {
      "je": `${stem}is`,
      "tu": `${stem}is`,
      "il/elle": `${stem}it`,
      "nous": `${stem}issons`,
      "vous": `${stem}issez`,
      "ils/elles": `${stem}issent`
    };
  }

  if (verb.infinitive.endsWith("er")) {
    const stem = verb.infinitive.slice(0, -2);
    return {
      "je": `${stem}e`,
      "tu": `${stem}es`,
      "il/elle": `${stem}e`,
      "nous": `${stem}ons`,
      "vous": `${stem}ez`,
      "ils/elles": `${stem}ent`
    };
  }

  return verb.forms;
}

function checkConjugation() {
  const expected = state.conjugationItem.form;
  const user = els.conjugationInput.value;
  const strictOk = strictNormalize(user) === strictNormalize(expected);
  const looseOk = looseNormalize(user) === looseNormalize(expected);

  if (strictOk) {
    setFeedback(els.conjugationFeedback, `Верно: ${expected}`, true);
  } else if (looseOk) {
    setFeedback(els.conjugationFeedback, `Верно, но обратите внимание на акценты: ${expected}`, true);
  } else {
    setFeedback(els.conjugationFeedback, `Правильно: ${expected}`, false);
  }
  state.conjugationChecked = true;
}

function displayNoun(noun) {
  return `${noun.definite_article}${noun.definite_article === "l'" ? "" : " "}${noun.lemma}`;
}

function conjugationGroups() {
  return ["group-1", "group-2", "group-3"];
}

function renderGroupButtons(groups, dataName, activeValues) {
  const attr = `data-${dataName}`;
  return [
    `<button class="chip ${activeValues.has("all") ? "is-active" : ""}" ${attr}="all">Все спряжения</button>`,
    ...groups.map((group) => `<button class="chip ${activeValues.has(group) ? "is-active" : ""}" ${attr}="${escapeHtml(group)}">${escapeHtml(conjugationGroupShortLabel(group))}</button>`)
  ].join("");
}

function renderServiceTypeButtons() {
  const labels = {
    all: "Все служебные",
    phrase: "Фразы",
    question: "Вопросы",
    preposition: "Предлоги",
    pronoun: "Местоимения",
    adverb: "Наречия",
    service: "Прочее"
  };
  return Object.entries(labels).map(([value, label]) => (
    `<button class="chip ${state.serviceTypeFilters.has(value) ? "is-active" : ""}" data-service-type-filter="${value}">${label}</button>`
  )).join("");
}

function dictionaryWordCell(item) {
  if (item.kind === "verb") {
    const marker = item.rawType === "group-3" ? `<span class="verb-marker" title="3-е спряжение">III</span>` : "";
    return `<span class="word-with-marker"><button class="word-button" type="button" data-dictionary-verb="${escapeHtml(item.fr)}">${escapeHtml(item.fr)}</button>${marker}</span>`;
  }
  if (item.kind === "adjective") {
    return adjectiveWordCell(item);
  }
  return `<strong>${escapeHtml(item.fr)}</strong>`;
}

function adjectiveWordCell(item) {
  const feminine = item.feminine || item.fr;
  let feminineNote = "=";
  if (feminine !== item.fr) {
    feminineNote = feminine.startsWith(item.fr) ? `+${feminine.slice(item.fr.length)}` : feminine;
  }
  return `<strong>${escapeHtml(item.fr)}</strong> <span class="adj-ending">/ ${escapeHtml(feminineNote)}</span>`;
}

function compareDictionaryItems(a, b) {
  if (state.dictionarySort === "alphabet") {
    return a.sortKey.localeCompare(b.sortKey, "fr", { sensitivity: "base" });
  }
  const pageDiff = firstPage(b) - firstPage(a);
  if (pageDiff !== 0) return pageDiff;
  return b.order - a.order;
}

function compareVerbItems(a, b) {
  if (state.verbsSort === "alphabet") {
    return a.infinitive.localeCompare(b.infinitive, "fr", { sensitivity: "base" });
  }
  const pageDiff = firstPage({ page: pages(b) }) - firstPage({ page: pages(a) });
  if (pageDiff !== 0) return pageDiff;
  return state.data.verbs.indexOf(b) - state.data.verbs.indexOf(a);
}

function firstPage(item) {
  const value = String(item.page || "");
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function nounFormLabel(noun) {
  return `${noun.definite_article} / ${noun.indefinite_article}`;
}

function verbTypeLabel(type) {
  const labels = {
    "regular -er": "",
    "irregular": "",
    "irregular -ir": "",
    "irregular -re": "",
    "pronominal regular -er": "местоименный",
    "regular -er with stem change": "изменение основы"
  };
  return Object.prototype.hasOwnProperty.call(labels, type) ? labels[type] : "";
}

function conjugationGroup(verb) {
  if (verb.conjugation_group) return `group-${verb.conjugation_group}`;
  if (verb.type.includes("-er") || verb.type.includes("pronominal regular -er")) return "group-1";
  if (verb.type.includes("regular -ir") && !verb.type.includes("irregular")) return "group-2";
  return "group-3";
}

function conjugationGroupLabel(group) {
  const labels = {
    "group-1": "1-е спряжение (-er)",
    "group-2": "2-е спряжение (-ir, -issons)",
    "group-3": "3-е спряжение"
  };
  return labels[group] || group;
}

function conjugationGroupShortLabel(group) {
  const labels = {
    "group-1": "1-е спряжение",
    "group-2": "2-е спряжение",
    "group-3": "3-е спряжение"
  };
  return labels[group] || group;
}

function conjugationGroupRoman(group) {
  const labels = {
    "group-1": "I",
    "group-2": "II",
    "group-3": "III"
  };
  return labels[group] || group;
}

function verbFeatureTags(verb) {
  const tags = [];
  if (verb.type.includes("stem change") || verb.type.includes("accent change") || verb.type.includes("spelling change")) tags.push("изм. осн.");
  if (verb.type.includes("pronominal")) tags.push("мест.");
  return tags;
}

function renderVerbBadges(verb) {
  const badges = [conjugationGroupRoman(conjugationGroup(verb)), ...verbFeatureTags(verb)];
  return badges.map((badge) => `<span class="verb-badge">${escapeHtml(badge)}</span>`).join("");
}

function verbFormLabel(verb) {
  const detail = verbTypeLabel(verb.type);
  return [conjugationGroupLabel(conjugationGroup(verb)), detail].filter(Boolean).join(" / ");
}

function phraseTypeLabel(type) {
  const labels = {
    phrase: "фраза",
    question: "вопрос",
    "question phrase": "вопросительная фраза",
    "question word": "вопросительное слово",
    preposition: "предлог",
    adverb: "наречие",
    conjunction: "союз",
    negation: "отрицание",
    "grammar term": "грамматический термин",
    "indefinite adjective": "неопределённое прилагательное",
    "indefinite pronoun": "неопределённое местоимение",
    "weather phrase": "погода",
    "verb construction": "глагольная конструкция",
    "quantity expression": "количество",
    "contracted article": "слитный артикль",
    month: "месяц",
    numeral: "числительное",
    interjection: "междометие",
    "time expression": "выражение времени",
    "personal pronoun": "личное местоимение",
    "possessive phrase": "притяжательная фраза",
    "possessive adjective singular": "притяжательное прилагательное ед. числа",
    "possessive adjective masculine singular": "притяжательное прилагательное муж. рода ед. числа",
    "possessive adjective plural": "притяжательное прилагательное мн. числа",
    "possessive adjective feminine singular": "притяжательное прилагательное жен. рода ед. числа",
    "demonstrative adjective feminine singular": "указательное прилагательное жен. рода ед. числа",
    "demonstrative adjective masculine singular": "указательное прилагательное муж. рода ед. числа",
    "definite article": "определенный артикль",
    "definite article elided": "усеченный определенный артикль",
    "definite article plural": "определенный артикль мн. числа",
    "indefinite article": "неопределенный артикль",
    "adverb/noun": "наречие / существительное"
  };
  return labels[type] || type;
}

function phraseKindLabel(type, item = null) {
  if (isPhraseItem(type, item)) return "фраза";
  if (type === "question" || type === "question phrase" || type === "question word") return "вопр.";
  if (type === "preposition") return "предл.";
  if (type === "personal pronoun" || type === "indefinite pronoun") return "мест.";
  if (type === "numeral") return "числ.";
  if (type === "month" || type === "time expression") return "время";
  if (type === "adverb") return "нареч.";
  if (type === "adverb/noun") return "нареч.";
  if (type.includes("adjective") || type === "possessive phrase") return "мест.";
  if (type.includes("article")) return "арт.";
  return "служ.";
}

function serviceType(type, item = null) {
  if (isPhraseItem(type, item)) return "phrase";
  if (type === "question" || type === "question phrase" || type === "question word") return "question";
  if (type === "preposition") return "preposition";
  if (type === "adverb") return "adverb";
  if (type === "adverb/noun") return "adverb";
  if (type.includes("adjective") || type === "personal pronoun" || type === "indefinite pronoun" || type === "possessive phrase") return "pronoun";
  return "service";
}

function isPhraseType(type) {
  return [
    "phrase",
    "question phrase",
    "time expression",
    "weather phrase",
    "verb construction",
    "quantity expression",
    "possessive phrase"
  ].includes(type);
}

function isPhraseItem(type, item) {
  if (isPhraseType(type)) return true;
  if (!item) return false;
  return type === "question" && /[\s'’]/.test(item.text);
}

function isPronounPhrase(item) {
  return ["personal pronoun", "indefinite pronoun"].includes(item.type) || item.type.includes("possessive adjective") || item.type.includes("demonstrative adjective");
}

function pronounGroup(type) {
  if (type === "personal pronoun") return "personal";
  if (type.includes("possessive")) return "possessive";
  if (type.includes("demonstrative")) return "demonstrative";
  return "indefinite";
}

function itemKey(kind, text) {
  return `${kind}:${normalizeSearch(text)}`;
}

function isCalendarNoun(item) {
  return weekdays.includes(item.lemma);
}

function isCalendarPhrase(item) {
  return item.type === "month" || item.type === "numeral" || weekdays.includes(item.text);
}

function archiveWord(key) {
  state.archivedWords.add(key);
  saveArchive();
  renderStats();
  renderDictionary();
  renderVerbs();
  renderArchiveCount();
}

function restoreArchivedWord(key) {
  state.archivedWords.delete(key);
  saveArchive();
  renderStats();
  renderDictionary();
  renderVerbs();
  renderArchiveCount();
  renderArchiveList();
}

function restoreAllArchived() {
  state.archivedWords.clear();
  saveArchive();
  renderStats();
  renderDictionary();
  renderVerbs();
  renderArchiveCount();
  renderArchiveList();
}

function openArchiveModal() {
  renderArchiveList();
  els.archiveModal.hidden = false;
}

function closeArchiveModal() {
  els.archiveModal.hidden = true;
}

function renderArchiveCount() {
  els.archiveCount.textContent = String(state.archivedWords.size);
  els.archiveOpen.classList.toggle("has-items", state.archivedWords.size > 0);
}

function renderArchiveList() {
  const index = dictionaryIndex();
  const items = [...state.archivedWords].map((key) => index.get(key)).filter(Boolean);
  els.archiveClear.hidden = !items.length;
  els.archiveList.innerHTML = items.map((item) => `
    <div class="archive-item">
      <div>
        <strong>${escapeHtml(item.fr)}</strong>
        <span>${escapeHtml(item.typeTag)} · ${escapeHtml(item.translation || "")}</span>
      </div>
      <button class="secondary" type="button" data-restore-word="${escapeHtml(item.key)}">Вернуть</button>
    </div>
  `).join("") || `<div class="empty">Архив пуст</div>`;
  els.archiveList.querySelectorAll("[data-restore-word]").forEach((button) => {
    button.addEventListener("click", () => restoreArchivedWord(button.dataset.restoreWord));
  });
}

function dictionaryIndex() {
  const index = new Map();
  const previousArchive = state.archivedWords;
  state.archivedWords = new Set();
  dictionaryItems().forEach((item) => index.set(item.key, item));
  state.archivedWords = previousArchive;
  return index;
}

function loadArchive() {
  if (typeof localStorage === "undefined") return;
  try {
    const values = JSON.parse(localStorage.getItem(archiveStorageKey) || "[]");
    state.archivedWords = new Set(Array.isArray(values) ? values : []);
  } catch {
    state.archivedWords = new Set();
  }
}

function saveArchive() {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(archiveStorageKey, JSON.stringify([...state.archivedWords]));
}

function renderVerbForms(verb) {
  const pairs = [
    ["je", verb.forms.je],
    ["nous", verb.forms.nous],
    ["tu", verb.forms.tu],
    ["vous", verb.forms.vous],
    ["il/elle", verb.forms["il/elle"]],
    ["ils/elles", verb.forms["ils/elles"]]
  ];
  return pairs.filter(([, form]) => form).map(([pronoun, form]) => `
    <div class="form-row">
      <span class="pronoun">${escapeHtml(displayPronoun(pronoun, form))}</span>
      <strong>${escapeHtml(form)}</strong>
    </div>
  `).join("");
}

function displayPronoun(pronoun, form) {
  if (pronoun === "je" && /^[aeiouyhâàäéèêëîïôöùûü]/i.test(form)) return "j'";
  return pronoun;
}

function startsWithVowel(value) {
  return /^[aeiouyhâàäéèêëîïôöùûü]/i.test(value);
}

function openVerbModal(verb) {
  if (!verb) return;
  els.verbModalTitle.textContent = verb.infinitive;
  els.verbModalTranslation.textContent = verb.translation_ru;
  els.verbModalType.innerHTML = renderVerbBadges(verb);
  els.verbModalForms.innerHTML = Object.entries(verb.forms).map(([pronoun, form]) => `
    <div class="form-row">
      <span class="pronoun">${escapeHtml(displayPronoun(pronoun, form))}</span>
      <strong>${escapeHtml(form)}</strong>
    </div>
  `).join("");
  els.verbModal.hidden = false;
}

function closeVerbModal() {
  els.verbModal.hidden = true;
}

async function openLocalMaterial(event) {
  event.preventDefault();
  const card = event.currentTarget;
  try {
    const response = await fetch(card.getAttribute("href"));
    if (!response.ok) throw new Error("Не удалось открыть файл");
  } catch (error) {
    window.location.href = card.getAttribute("href");
  }
}

function pages(item) {
  return item.printed_page || (item.printed_pages || []).join(", ");
}

function sample(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function normalize(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function normalizeSearch(value) {
  return normalize(value)
    .replaceAll("œ", "oe")
    .replaceAll("æ", "ae")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’'`´-]/g, "")
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function strictNormalize(value) {
  return normalize(value).replace(/[?!.,:;]+$/g, "");
}

function looseNormalize(value) {
  return strictNormalize(value)
    .replaceAll("œ", "oe")
    .replaceAll("æ", "ae")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’'`´-]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "");
}

function toggleMultiFilter(values, value) {
  if (value === "all") {
    values.clear();
    values.add("all");
    return;
  }
  values.delete("all");
  if (values.has(value)) values.delete(value);
  else values.add(value);
  if (!values.size) values.add("all");
}

function syncMultiButtons(selector, values) {
  document.querySelectorAll(selector).forEach((item) => {
    const value = item.dataset.dictionaryFilter || item.dataset.dictionaryVerbTypeFilter || item.dataset.verbsTypeFilter || item.dataset.serviceTypeFilter;
    item.classList.toggle("is-active", values.has(value));
  });
}

function filterIncludes(values, value) {
  return values.has("all") || values.has(value);
}

function setActive(selector, activeButton) {
  document.querySelectorAll(selector).forEach((item) => {
    item.classList.toggle("is-active", item === activeButton);
  });
}

function setFeedback(element, text, ok = null) {
  element.textContent = text;
  element.classList.toggle("ok", ok === true);
  element.classList.toggle("bad", ok === false);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

init().catch((error) => {
  document.body.innerHTML = `<main class="main"><h1>Не удалось загрузить приложение</h1><p>${escapeHtml(error.message)}</p></main>`;
});
