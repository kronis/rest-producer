# Backend

***Backend*** er en Spring Boot applikasjon som tilbyr et Rest API <TODO: Sett inn beskrivelse her>.


#### Version
1.0.0

## Teknologi
*Backend* er satt opp med følgende teknologi-stakk.

##### Byggeverktøy
* [Gradle](http://gradle.org)

##### Programmeringsspråk
* [Groovy](http://www.groovy-lang.org/)
* [Java 8](http://java.com)

##### Applikasjonsplattform
* [Spring Framework](https://spring.io/)  
* [Spring Boot](http://projects.spring.io/spring-boot/)
  
##### Applikasjonsserver
* [Spring Boot / Embedded Tomcat](http://projects.spring.io/spring-boot/)
  
##### Databaseserver
* [Microsoft SQL Server](https://msdn.microsoft.com/library/mt590198)
* [H2 DB](http://www.h2database.com) - Embedded DB for integrasjonstester
 
##### Feature-toggling
* [Togglz](https://www.togglz.org/)

##### Design constraints
* [JDepend](http://clarkware.com/software/JDepend.html)

##### API-dokumentasjon
* [Spring REST Docs](https://projects.spring.io/spring-restdocs/)

##### Monitorering
* [JavaMelody](https://github.com/javamelody/javamelody/wiki)


  
##### Integrasjon
Backend integrerer mot **SDB** (ReKu) over HTTP mot SDBs HTTP Rest API. 
SDB endpoint er konfigurert gjennom konfigurasjons-property `sdbapi.env` (se *Konfigurasjonsprofiler*). 


### Installasjon
For å bygge og kjøre prosjektet lokalt trenger man [Java 8](http://java.com) installert.
(Gradle er bundlet i prosjektet)

Verifiser Java versjon:
```sh
$ java -version
```

## Utvikling

### Bygge prosjektet

#### Gradle wrapper
```sh
$ gradle wrapper --gradle-version <gradleVersion>
```

#### Fullt bygg med enhetstester og integrasjonstester 
```sh
$ ../gradlew clean build
```

#### Enhetstester
(Opsjon --info er nyttig å ha med for å få vist feilmeldinger for tester som feiler.)

##### Kjører alle enhetstester: 
```sh
$ ../gradlew clean test --info
```

##### Kjører utvalgte enhetstester, eksempler: 
```sh
$ ../gradlew clean test --info --tests mydummyproject.rest.MyDummyServiceTest 
$ ../gradlew clean test --info --tests mydummyproject.rest.MyDummyServiceTest.'Should get dummies' 
```


#### Integrasjonstester
Integrasjonstestene kjører opp Spring Boot applikasjonserver i integrasjonstestmodus mot embedded testdatabase og mock SDB HTTP API.

(Opsjon --info er nyttig å ha med for å få vist feilmeldinger for tester som feiler.)


### Kjøre applikasjonsserver
Start server:
```sh
$ ../gradlew bootRun  
```

Applikasjonsserveren vil da starte med profil **_dev_** (default profil) på **port 8080**.
 
API-tjenestene ligger under URL
`http://[SERVER]:[PORT]/my-dummy-api/api`  


Eksempel API-URL lokalt:
`http://localhost:8080/my-dummy-api/api/v1/my-dummies`


### Konfigurasjonsprofiler
Konfigurasjonsparametre for applikasjonen (HTTP server parametre, database, integrasjonspunkter etc.) settes vha. Spring Boot __*profiler*__. Applikasjonen har en Spring Boot profil for hvert runtime-miljø (**Prod, QA, Test, Dev**), samt testprofiler.

Hver profil er representert ved en **`application-[ENV].properties`** fil.


| Profil        | Beskrivelse        			| Properties-fil										 |
| ------------- |-------------------------------| -------------------------------------------------------|
| **prod**      	| Produksjonsmiljø 				| `backend/src/main/resources/application-prod.properties` |
| **qa** 	     	| QA-miljø 						| `backend/src/main/resources/application-qa.properties` |
| **test**      	| Testmiljø 					| `backend/src/main/resources/application-test.properties` |
| **dev** 	     	| Lokalt utviklingsmiljø 		| `backend/src/main/resources/application-dev.properties` |
| **it**            | Profil for integrasjonstester | `backend/src/test/resources/application-it.properties` 	 |

Alle profilene arver properties fra **`backend/src/main/resources/application.properties`**.

Profil spesifiseres ved start av applikasjonsserver. **Default profil er `dev`**.


### Feature-toggling
Feature-toggling støttes vha. [Togglz](https://www.togglz.org/).
Enum MyDummyProjectFeature (TODO: Sett inn riktig navn) definerer features som kan toggles.

GUI for å toggle features:
`http://localhost:<PORT>/my-dummy-api/togglz`

Toggling-tilstand er persistert i property-fil _feature-toggle.properties_, som opprettes automatisk runtime i stående katalog første gang feature endrer tilstand (vha. GUI).


### JavaMelody monitorering
Applikasjonen har satt opp JavaMelody-monitorering [JavaMelody](https://github.com/javamelody/javamelody/wiki). Montering av minne, CPU, tråder, JDBC-forbindelser, HTTP-kall etc.

URL:
`http://[SERVER]:[PORT]/my-dummy-api/monitoring`  


Eksempel URL lokalt:
`http://localhost:8080/my-dummy-api/monitoring`

Krever pålogging med bruker som har rolle _TRM_Role_AdminTech_.
Det er satt opp eget sikkerhets-realm for JavaMelody i _security.xml_.


### H2 Console
Konsoll for H2 database (embedded DB):
`http://127.0.0.1:<PORT>/my-dummy-api/h2-console`

Merk: Må bruke 127.0.0.1 istedenfor localhost pga. sikkerhetsoppsett.

JDBC URL: `jdbc:h2:<Full-kvalifisert sti til embedded-db modul i prosjektet>/db-unpacked/embedded-db`
(eksempel: `jdbc:h2:/Users/tor-haavard/dev/my-dummy-project/embedded-db/db-unpacked/embedded-db)` 

Det er satt opp eget sikkerhets-realm for H2 Console i _security.xml_.


### JDepend
[JDepend](http://clarkware.com/software/JDepend.html) er satt opp for å kontrollere design constraints.
Se enhetstest _ConstraintTest_.


## TODO
* Erstatt portnummer 8080 med riktig portnummer (kun etter behov)
* Erstatt context root 'my-dummy-api' med riktig context root (application.properties, server.context-path=/SAME_AS_IN_PROD)
* Erstatt spring.boot.admin.client.name property med riktig applikasjonsnavn
* **Fjern kode, dependencies, propereties du ikke bruker**



## GOTCHAS

https://github.com/spring-projects/spring-hateoas/issues/222
