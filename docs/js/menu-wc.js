'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">
                        <img alt="" class="img-responsive" data-type="custom-logo" src=images/rds-newlogo-transparent.png>
                    </a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Escribe para buscar"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Comenzando</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Descripción general
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>Léeme
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencias
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Módulos</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AccountsModule.html" data-type="entity-link" >AccountsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AccountsModule-f2486600830bb68a81b2b7bed2d0a492"' : 'data-target="#xs-components-links-module-AccountsModule-f2486600830bb68a81b2b7bed2d0a492"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AccountsModule-f2486600830bb68a81b2b7bed2d0a492"' :
                                            'id="xs-components-links-module-AccountsModule-f2486600830bb68a81b2b7bed2d0a492"' }>
                                            <li class="link">
                                                <a href="components/AccountsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AccountsListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountsListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AccountsTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountsTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChangeGradeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChangeGradeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewAccountComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewAccountComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewAccountConfirmComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewAccountConfirmComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SaveUserErrorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SaveUserErrorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserEditDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserEditDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AccountsModule-f2486600830bb68a81b2b7bed2d0a492"' : 'data-target="#xs-injectables-links-module-AccountsModule-f2486600830bb68a81b2b7bed2d0a492"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AccountsModule-f2486600830bb68a81b2b7bed2d0a492"' :
                                        'id="xs-injectables-links-module-AccountsModule-f2486600830bb68a81b2b7bed2d0a492"' }>
                                        <li class="link">
                                            <a href="injectables/AccountsDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountsDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AccountsDomainDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountsDomainDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AccountsDomainEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountsDomainEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AccountsDomainService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountsDomainService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AccountsEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountsEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AccountsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AccountsRoutingModule.html" data-type="entity-link" >AccountsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AnnouncementsModule.html" data-type="entity-link" >AnnouncementsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AnnouncementsModule-5838c55582d8ea25a3bce97cec1a9e42"' : 'data-target="#xs-components-links-module-AnnouncementsModule-5838c55582d8ea25a3bce97cec1a9e42"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AnnouncementsModule-5838c55582d8ea25a3bce97cec1a9e42"' :
                                            'id="xs-components-links-module-AnnouncementsModule-5838c55582d8ea25a3bce97cec1a9e42"' }>
                                            <li class="link">
                                                <a href="components/AnnouncementDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnnouncementDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AnnouncementResultComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnnouncementResultComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CourseAnnouncementsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseAnnouncementsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AnnouncementsModule-5838c55582d8ea25a3bce97cec1a9e42"' : 'data-target="#xs-injectables-links-module-AnnouncementsModule-5838c55582d8ea25a3bce97cec1a9e42"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AnnouncementsModule-5838c55582d8ea25a3bce97cec1a9e42"' :
                                        'id="xs-injectables-links-module-AnnouncementsModule-5838c55582d8ea25a3bce97cec1a9e42"' }>
                                        <li class="link">
                                            <a href="injectables/AnnouncementDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnnouncementDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AnnouncementEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnnouncementEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AnnouncementsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnnouncementsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AnnouncementsRoutingModule.html" data-type="entity-link" >AnnouncementsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-1db55b5d13f2cef0bd14d47b5ae9156f"' : 'data-target="#xs-components-links-module-AppModule-1db55b5d13f2cef0bd14d47b5ae9156f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-1db55b5d13f2cef0bd14d47b5ae9156f"' :
                                            'id="xs-components-links-module-AppModule-1db55b5d13f2cef0bd14d47b5ae9156f"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-5273f5071f6eb072ab8486adb69970ea"' : 'data-target="#xs-components-links-module-AuthModule-5273f5071f6eb072ab8486adb69970ea"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-5273f5071f6eb072ab8486adb69970ea"' :
                                            'id="xs-components-links-module-AuthModule-5273f5071f6eb072ab8486adb69970ea"' }>
                                            <li class="link">
                                                <a href="components/LoginDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-5273f5071f6eb072ab8486adb69970ea"' : 'data-target="#xs-injectables-links-module-AuthModule-5273f5071f6eb072ab8486adb69970ea"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-5273f5071f6eb072ab8486adb69970ea"' :
                                        'id="xs-injectables-links-module-AuthModule-5273f5071f6eb072ab8486adb69970ea"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GapiService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GapiService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ClassroomModule.html" data-type="entity-link" >ClassroomModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ClassroomModule-5d0ac77b36c9d62a08eb0359e3cd07d0"' : 'data-target="#xs-components-links-module-ClassroomModule-5d0ac77b36c9d62a08eb0359e3cd07d0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ClassroomModule-5d0ac77b36c9d62a08eb0359e3cd07d0"' :
                                            'id="xs-components-links-module-ClassroomModule-5d0ac77b36c9d62a08eb0359e3cd07d0"' }>
                                            <li class="link">
                                                <a href="components/ClassroomComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClassroomComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ClassroomRoutingModule.html" data-type="entity-link" >ClassroomRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CoreModule-18afb9293d85cfa844c30b269a02936a"' : 'data-target="#xs-components-links-module-CoreModule-18afb9293d85cfa844c30b269a02936a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CoreModule-18afb9293d85cfa844c30b269a02936a"' :
                                            'id="xs-components-links-module-CoreModule-18afb9293d85cfa844c30b269a02936a"' }>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidenavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidenavComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CoreModule-18afb9293d85cfa844c30b269a02936a"' : 'data-target="#xs-injectables-links-module-CoreModule-18afb9293d85cfa844c30b269a02936a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoreModule-18afb9293d85cfa844c30b269a02936a"' :
                                        'id="xs-injectables-links-module-CoreModule-18afb9293d85cfa844c30b269a02936a"' }>
                                        <li class="link">
                                            <a href="injectables/LayoutService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ThemeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ThemeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoursesModule.html" data-type="entity-link" >CoursesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CoursesModule-94908fe9613537f7a8b30328fa6bab99"' : 'data-target="#xs-components-links-module-CoursesModule-94908fe9613537f7a8b30328fa6bab99"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CoursesModule-94908fe9613537f7a8b30328fa6bab99"' :
                                            'id="xs-components-links-module-CoursesModule-94908fe9613537f7a8b30328fa6bab99"' }>
                                            <li class="link">
                                                <a href="components/CourseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CourseDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CourseUserDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseUserDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CoursesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CoursesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CoursesListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CoursesListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CoursesModule-94908fe9613537f7a8b30328fa6bab99"' : 'data-target="#xs-injectables-links-module-CoursesModule-94908fe9613537f7a8b30328fa6bab99"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoursesModule-94908fe9613537f7a8b30328fa6bab99"' :
                                        'id="xs-injectables-links-module-CoursesModule-94908fe9613537f7a8b30328fa6bab99"' }>
                                        <li class="link">
                                            <a href="injectables/CourseDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CourseEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CoursesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CoursesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoursesRoutingModule.html" data-type="entity-link" >CoursesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CourseWorksModule.html" data-type="entity-link" >CourseWorksModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CourseWorksModule-ece3ecb3faeef5be58cc259443263695"' : 'data-target="#xs-components-links-module-CourseWorksModule-ece3ecb3faeef5be58cc259443263695"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CourseWorksModule-ece3ecb3faeef5be58cc259443263695"' :
                                            'id="xs-components-links-module-CourseWorksModule-ece3ecb3faeef5be58cc259443263695"' }>
                                            <li class="link">
                                                <a href="components/CourseWorkComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseWorkComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CourseWorksModule-ece3ecb3faeef5be58cc259443263695"' : 'data-target="#xs-injectables-links-module-CourseWorksModule-ece3ecb3faeef5be58cc259443263695"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CourseWorksModule-ece3ecb3faeef5be58cc259443263695"' :
                                        'id="xs-injectables-links-module-CourseWorksModule-ece3ecb3faeef5be58cc259443263695"' }>
                                        <li class="link">
                                            <a href="injectables/CourseWorkDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseWorkDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CourseWorkEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseWorkEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CourseWorksService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseWorksService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StudentSubmissionDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentSubmissionDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StudentSubmissionEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentSubmissionEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TopicDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TopicDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TopicEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TopicEntityService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CourseWorksRoutingModule.html" data-type="entity-link" >CourseWorksRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link" >MaterialModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-MaterialModule-ea0f9fc7853b4699bd46a93985a63397"' : 'data-target="#xs-directives-links-module-MaterialModule-ea0f9fc7853b4699bd46a93985a63397"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directivas</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-MaterialModule-ea0f9fc7853b4699bd46a93985a63397"' :
                                        'id="xs-directives-links-module-MaterialModule-ea0f9fc7853b4699bd46a93985a63397"' }>
                                        <li class="link">
                                            <a href="directives/MaterialElevationDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MaterialElevationDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ParallaxDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParallaxDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NgrxStoreModule.html" data-type="entity-link" >NgrxStoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SchoolModule.html" data-type="entity-link" >SchoolModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SchoolModule-0a1618570daea431e21583b8d87af2a6"' : 'data-target="#xs-components-links-module-SchoolModule-0a1618570daea431e21583b8d87af2a6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SchoolModule-0a1618570daea431e21583b8d87af2a6"' :
                                            'id="xs-components-links-module-SchoolModule-0a1618570daea431e21583b8d87af2a6"' }>
                                            <li class="link">
                                                <a href="components/NewCicleDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewCicleDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolCoursesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolCoursesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolCoursesDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolCoursesDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolCoursesTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolCoursesTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolDashboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SchoolModule-0a1618570daea431e21583b8d87af2a6"' : 'data-target="#xs-injectables-links-module-SchoolModule-0a1618570daea431e21583b8d87af2a6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SchoolModule-0a1618570daea431e21583b8d87af2a6"' :
                                        'id="xs-injectables-links-module-SchoolModule-0a1618570daea431e21583b8d87af2a6"' }>
                                        <li class="link">
                                            <a href="injectables/AccountsDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountsDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AccountsDomainDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountsDomainDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AccountsDomainEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountsDomainEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AccountsDomainService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountsDomainService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AccountsEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountsEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AccountsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SchoolCoursesDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolCoursesDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SchoolCoursesEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolCoursesEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SchoolCoursesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolCoursesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SchoolService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SchoolRoutingModule.html" data-type="entity-link" >SchoolRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-615c8df4f22a163d3668ec73733bb0de"' : 'data-target="#xs-components-links-module-SharedModule-615c8df4f22a163d3668ec73733bb0de"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-615c8df4f22a163d3668ec73733bb0de"' :
                                            'id="xs-components-links-module-SharedModule-615c8df4f22a163d3668ec73733bb0de"' }>
                                            <li class="link">
                                                <a href="components/BreadcrumbComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BreadcrumbComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfirmDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfirmDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeleteButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeleteButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InfoCardsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InfoCardsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ParallaxSpaceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParallaxSpaceComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SharedModule-615c8df4f22a163d3668ec73733bb0de"' : 'data-target="#xs-injectables-links-module-SharedModule-615c8df4f22a163d3668ec73733bb0de"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SharedModule-615c8df4f22a163d3668ec73733bb0de"' :
                                        'id="xs-injectables-links-module-SharedModule-615c8df4f22a163d3668ec73733bb0de"' }>
                                        <li class="link">
                                            <a href="injectables/SeoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SeoService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SnackService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SnackService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SnackbarService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SnackbarService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SubscriptionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscriptionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StudentsModule.html" data-type="entity-link" >StudentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StudentsModule-3aa2b7b89e2b480c57b49d15006149a6"' : 'data-target="#xs-components-links-module-StudentsModule-3aa2b7b89e2b480c57b49d15006149a6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StudentsModule-3aa2b7b89e2b480c57b49d15006149a6"' :
                                            'id="xs-components-links-module-StudentsModule-3aa2b7b89e2b480c57b49d15006149a6"' }>
                                            <li class="link">
                                                <a href="components/CourseStudentsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseStudentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GuardiansListDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GuardiansListDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StudentsModule-3aa2b7b89e2b480c57b49d15006149a6"' : 'data-target="#xs-injectables-links-module-StudentsModule-3aa2b7b89e2b480c57b49d15006149a6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StudentsModule-3aa2b7b89e2b480c57b49d15006149a6"' :
                                        'id="xs-injectables-links-module-StudentsModule-3aa2b7b89e2b480c57b49d15006149a6"' }>
                                        <li class="link">
                                            <a href="injectables/StudentDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StudentEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentEntityService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StudentsRoutingModule.html" data-type="entity-link" >StudentsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TeachersModule.html" data-type="entity-link" >TeachersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TeachersModule-8543f8066ec867c1bd45f6da6a75a063"' : 'data-target="#xs-components-links-module-TeachersModule-8543f8066ec867c1bd45f6da6a75a063"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TeachersModule-8543f8066ec867c1bd45f6da6a75a063"' :
                                            'id="xs-components-links-module-TeachersModule-8543f8066ec867c1bd45f6da6a75a063"' }>
                                            <li class="link">
                                                <a href="components/CourseTeachersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseTeachersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TeachersModule-8543f8066ec867c1bd45f6da6a75a063"' : 'data-target="#xs-injectables-links-module-TeachersModule-8543f8066ec867c1bd45f6da6a75a063"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TeachersModule-8543f8066ec867c1bd45f6da6a75a063"' :
                                        'id="xs-injectables-links-module-TeachersModule-8543f8066ec867c1bd45f6da6a75a063"' }>
                                        <li class="link">
                                            <a href="injectables/TeacherDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeacherDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TeacherEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeacherEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TeachersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeachersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TeachersRoutingModule.html" data-type="entity-link" >TeachersRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UserProfilesModule.html" data-type="entity-link" >UserProfilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UserProfilesModule-640e98a574f4aa318a22aa42ce060150"' : 'data-target="#xs-components-links-module-UserProfilesModule-640e98a574f4aa318a22aa42ce060150"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserProfilesModule-640e98a574f4aa318a22aa42ce060150"' :
                                            'id="xs-components-links-module-UserProfilesModule-640e98a574f4aa318a22aa42ce060150"' }>
                                            <li class="link">
                                                <a href="components/EditProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserProfileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserProfilesModule-640e98a574f4aa318a22aa42ce060150"' : 'data-target="#xs-injectables-links-module-UserProfilesModule-640e98a574f4aa318a22aa42ce060150"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserProfilesModule-640e98a574f4aa318a22aa42ce060150"' :
                                        'id="xs-injectables-links-module-UserProfilesModule-640e98a574f4aa318a22aa42ce060150"' }>
                                        <li class="link">
                                            <a href="injectables/GuardianDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GuardianDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GuardianEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GuardianEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserProfileDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserProfileDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserProfileEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserProfileEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserProfilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserProfilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserProfilesRoutingModule.html" data-type="entity-link" >UserProfilesRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Clases</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AccountsTableDataSource.html" data-type="entity-link" >AccountsTableDataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomSerializer.html" data-type="entity-link" >CustomSerializer</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatabaseService.html" data-type="entity-link" >DatabaseService</a>
                            </li>
                            <li class="link">
                                <a href="classes/FirebaseService.html" data-type="entity-link" >FirebaseService</a>
                            </li>
                            <li class="link">
                                <a href="classes/FirestoreGenericService.html" data-type="entity-link" >FirestoreGenericService</a>
                            </li>
                            <li class="link">
                                <a href="classes/FirestoreService.html" data-type="entity-link" >FirestoreService</a>
                            </li>
                            <li class="link">
                                <a href="classes/Group.html" data-type="entity-link" >Group</a>
                            </li>
                            <li class="link">
                                <a href="classes/RealTimeDatabaseService.html" data-type="entity-link" >RealTimeDatabaseService</a>
                            </li>
                            <li class="link">
                                <a href="classes/UsersListDataSource.html" data-type="entity-link" >UsersListDataSource</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Inyectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AccountsDataService.html" data-type="entity-link" >AccountsDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AccountsDomainDataService.html" data-type="entity-link" >AccountsDomainDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AccountsDomainEntityService.html" data-type="entity-link" >AccountsDomainEntityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AccountsEffects.html" data-type="entity-link" >AccountsEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AccountsEntityService.html" data-type="entity-link" >AccountsEntityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AnnouncementDataService.html" data-type="entity-link" >AnnouncementDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AnnouncementEntityService.html" data-type="entity-link" >AnnouncementEntityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppEffects.html" data-type="entity-link" >AppEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthEffects.html" data-type="entity-link" >AuthEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CourseDataService.html" data-type="entity-link" >CourseDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CourseEntityService.html" data-type="entity-link" >CourseEntityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CourseWorkDataService.html" data-type="entity-link" >CourseWorkDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CourseWorkEntityService.html" data-type="entity-link" >CourseWorkEntityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DialogEffects.html" data-type="entity-link" >DialogEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GapiService.html" data-type="entity-link" >GapiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GuardianDataService.html" data-type="entity-link" >GuardianDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GuardianEntityService.html" data-type="entity-link" >GuardianEntityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LayoutService.html" data-type="entity-link" >LayoutService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgrxToastService.html" data-type="entity-link" >NgrxToastService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RouteEffects.html" data-type="entity-link" >RouteEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SchoolCoursesDataService.html" data-type="entity-link" >SchoolCoursesDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SeoService.html" data-type="entity-link" >SeoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SnackbarService.html" data-type="entity-link" >SnackbarService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SnackEffects.html" data-type="entity-link" >SnackEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SnackService.html" data-type="entity-link" >SnackService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SpinnerEffects.html" data-type="entity-link" >SpinnerEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StudentDataService.html" data-type="entity-link" >StudentDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StudentEntityService.html" data-type="entity-link" >StudentEntityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StudentsService.html" data-type="entity-link" >StudentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StudentSubmissionDataService.html" data-type="entity-link" >StudentSubmissionDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StudentSubmissionEntityService.html" data-type="entity-link" >StudentSubmissionEntityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubscriptionService.html" data-type="entity-link" >SubscriptionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeacherDataService.html" data-type="entity-link" >TeacherDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeacherEntityService.html" data-type="entity-link" >TeacherEntityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThemeService.html" data-type="entity-link" >ThemeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TopicDataService.html" data-type="entity-link" >TopicDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TopicEntityService.html" data-type="entity-link" >TopicEntityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserProfileDataService.html" data-type="entity-link" >UserProfileDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserProfileEffects.html" data-type="entity-link" >UserProfileEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserProfileEntityService.html" data-type="entity-link" >UserProfileEntityService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guardias</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AccountResolver.html" data-type="entity-link" >AccountResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/AccountsResolver.html" data-type="entity-link" >AccountsResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link" >AdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AnnouncementResolver.html" data-type="entity-link" >AnnouncementResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/CourseResolver.html" data-type="entity-link" >CourseResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/CoursesResolver.html" data-type="entity-link" >CoursesResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/CourseWorksResolver.html" data-type="entity-link" >CourseWorksResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/GuardiansResolver.html" data-type="entity-link" >GuardiansResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/SchoolCoursesResolver.html" data-type="entity-link" >SchoolCoursesResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/SchoolUsersResolver.html" data-type="entity-link" >SchoolUsersResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/StudentCoursesResolver.html" data-type="entity-link" >StudentCoursesResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/StudentsResolver.html" data-type="entity-link" >StudentsResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/StudentSubmissionsResolver.html" data-type="entity-link" >StudentSubmissionsResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/TeachersResolver.html" data-type="entity-link" >TeachersResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/TopicsResolver.html" data-type="entity-link" >TopicsResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/UserProfileResolver.html" data-type="entity-link" >UserProfileResolver</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AccountDomain.html" data-type="entity-link" >AccountDomain</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppState.html" data-type="entity-link" >AppState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Assigment.html" data-type="entity-link" >Assigment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AssignedCourse.html" data-type="entity-link" >AssignedCourse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthenticationState.html" data-type="entity-link" >AuthenticationState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CourseMaterial.html" data-type="entity-link" >CourseMaterial</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CourseMaterialSet.html" data-type="entity-link" >CourseMaterialSet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Date.html" data-type="entity-link" >Date</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DriveFile.html" data-type="entity-link" >DriveFile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DriveFolder.html" data-type="entity-link" >DriveFolder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Entity.html" data-type="entity-link" >Entity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExampleFlatNode.html" data-type="entity-link" >ExampleFlatNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Form.html" data-type="entity-link" >Form</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GlobalPermissions.html" data-type="entity-link" >GlobalPermissions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Grade.html" data-type="entity-link" >Grade</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GradeHistory.html" data-type="entity-link" >GradeHistory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Group.html" data-type="entity-link" >Group</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GroupResponse.html" data-type="entity-link" >GroupResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBreadCrumb.html" data-type="entity-link" >IBreadCrumb</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFirebase.html" data-type="entity-link" >IFirebase</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Link.html" data-type="entity-link" >Link</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Material.html" data-type="entity-link" >Material</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModifyIndividualStudentsOptions.html" data-type="entity-link" >ModifyIndividualStudentsOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Name.html" data-type="entity-link" >Name</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NavLink.html" data-type="entity-link" >NavLink</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Permission.html" data-type="entity-link" >Permission</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RoleSelectorId.html" data-type="entity-link" >RoleSelectorId</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RouterCard.html" data-type="entity-link" >RouterCard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RouterStateUrl.html" data-type="entity-link" >RouterStateUrl</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SchoolCourse.html" data-type="entity-link" >SchoolCourse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Score.html" data-type="entity-link" >Score</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SharedDriveFile.html" data-type="entity-link" >SharedDriveFile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StateHistory.html" data-type="entity-link" >StateHistory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StudentSubmission.html" data-type="entity-link" >StudentSubmission</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubmissionHistory.html" data-type="entity-link" >SubmissionHistory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserInsert.html" data-type="entity-link" >UserInsert</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserName.html" data-type="entity-link" >UserName</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserParent.html" data-type="entity-link" >UserParent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserPhoto.html" data-type="entity-link" >UserPhoto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserResponse.html" data-type="entity-link" >UserResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserStudent.html" data-type="entity-link" >UserStudent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserTeacher.html" data-type="entity-link" >UserTeacher</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/YouTubeVideo.html" data-type="entity-link" >YouTubeVideo</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscelánea</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Funciones</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Rutas</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Cobertura de la documentación</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});