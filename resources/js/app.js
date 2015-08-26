var appController = (function () {
    var app = {
        selectedTopic: null,
        selectedConfig: null,
        wordInformation: null,
        topicTemplate: null,
        topicIde: null,
        detailState: true
    },
        st = {
            backToWords : "#back-words",
            backToList: '#back-list',
            listTopics: 'div.list-item',
            appTransition: 'app-transitions',
            topBarContent: 'top-bar-content',
            topics: '#content-list-items',
            topicPanel: '#topic-panel',
            buttonAction: '.action-buttom',
            topicTitle: '#topic-title',
            topBar: '#top-bar-content',
            statusBar: '#app-status-bar',
            wordSelectionContent: '#word-selection-content',
            wordContent: '.word-content',
            wordTitle: '#word-title',
            wordPanel:'#word-panel'
        },
        dom = {},
        catchDom = function () {
            dom.backWords = $(st.backToWords);
            dom.backButton = $(st.backToList);
            dom.topicsContent = $(st.topics);
            dom.topicsPanel = $(st.topicPanel);
            dom.contentTopBar =  $(st.topBar);
            dom.statusBar = $(st.statusBar);
            dom.contentListItems = $(st.contentListItems);
            dom.panels = null;
            dom.topicTitle = $(st.topicTitle);
            dom.wordTitle = $(st.wordTitle);
            dom.wordPanel = $(st.wordPanel);
        },
        navigationControl = {
            createTopicContent: function () {
                app.selectedTopic = $(this);
                app.selectedConfig = db.config[app.selectedTopic.data('config')];
                app.topicTemplate = templates.collections[app.selectedConfig.template].content;
                app.topicIde = app.selectedTopic.attr('id') - 1;

                dom.topicsPanel.html(Mustache.render(app.topicTemplate, db.dataItems.list[app.topicIde]));
                dom.topicTitle.text(app.selectedTopic.data('name'));
                $(st.listTopics).toggle();

                navigationControl.statesControl(app.selectedTopic);
                navigationControl.changeAppBar(app.selectedConfig.colors);

                navigationControl.fillEvents(app.selectedConfig.eventToAdd);
            },
            changeAppBar: function(colors){
                dom.contentTopBar.css('background', colors.secondary);
                dom.statusBar.css('background', colors.primary);
            },
            createTransitions: function () {
                dom.panels = slidr.create(st.appTransition, {
                    controls: "none",
                    fade: true,
                    overflow: false,
                    timing: {
                        'linear': "0.4s ease-in-out 0s"
                    }
                }).start();
                dom.topBar = slidr.create(st.topBarContent, {
                    controls: "none",
                    direction: "vertical",
                    fade: true,
                    transition: "none"
                }).start();
            },
            createTopicsList: function () {
                dom.topicsContent.html(Mustache.render(templates.collections.item.content, db.dataTopics));
                dom.listItems = $(st.listTopics);
            },
            initMenu: function () {
                dom.topicsPanel.empty();
                navigationControl.statesControl($(this));
                navigationControl.changeAppBar(db.config.init.colors);

                $(st.listTopics).toggle();
            },
            statesControl: function (element) {
                dom.panels.slide(element.data('state'));
                dom.topBar.slide(element.data('top'));
            },
            fillEvents: function (eventName){
                switch (eventName) {
                    case 'translate-content':
                        events.controlTranslations();
                        break;
                    case 'select-content':
                        events.wordSelection();
                }
            },
            createWordContent: function () {
                dom.topBar.slide("word");
                dom.panels.slide("word-content");
                dom.wordTitle.text(app.wordInformation.word);
                dom.wordPanel.html(Mustache.render(templates.collections.word_content.content, app.wordInformation));                
            }           
        },
        events = {           
            controlTranslations: function () {
                $(st.buttonAction).click(function () {
                    $('#topic-card-' + $(this).data('card') + ' .dynamic').toggle();
                });
            },
            wordSelection: function () {
                $('.word-description').click(function () {
                    var selection = $(this);
                    $(st.wordContent).toggle();
                    app.wordInformation = db.dataItems.list[app.topicIde]
                                                         .items[selection.data('letter')]
                                                         .words[selection.data('word')];
                    navigationControl.createWordContent();
                    
                });
            }
        },
        suscribeEvents = function () {
            navigationControl.createTransitions();
            navigationControl.createTopicsList();

            dom.listItems.on('click', navigationControl.createTopicContent);
            dom.backButton.on('click', navigationControl.initMenu);
            dom.backWords.on('click', function () {
                $(st.wordContent).toggle();
                navigationControl.statesControl($(this));
            });
        };

    catchDom();
    suscribeEvents();
})();
