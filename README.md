
# Challenge Tecnica per Front End Software Engineer

- [Challenge Tecnica per Front End Software Engineer](#challenge-tecnica-per-front-end-software-engineer)
  - [Obiettivo](#obiettivo)
  - [Soluzione](#soluzione)
    - [Frontend - React Client](#frontend---react-client)
      - [Avviare l'applicazione in locale via npm script](#avviare-lapplicazione-in-locale-via-npm-script)
      - [Test unitari](#test-unitari)
      - [Storybook](#storybook)
    - [Backend](#backend)
      - [Avviare il server in locale via npm script](#avviare-il-server-in-locale-via-npm-script)
      - [Collection Postman](#collection-postman)
    - [Test E2E](#test-e2e)
    - [Docker](#docker)
      - [E2E test via docker](#e2e-test-via-docker)

## Obiettivo

Sviluppare sia la parte client che dei mock della parte server dei requisiti descritti nella consegna della challenge.

## Soluzione

La soluzione proposta consiste in 3 progetti node:

1. **frontend**: progetto React scritto in typescript per la parte client UI

2. **backend**: progetto Node in combinazione con Fastify per la parte API rest

3. **e2E**: progetto Node che utilizza Cypress per l'esecuzione dei test e2e

E' possibile avviare l'applicazione sulla propria macchina sia mediante **script npm** sia attraverso **Docker**.

In particolare, per eseguire tutti i servizi con docker sarà sufficiente eseguire il file bash `docker-start-app.sh` all'interno della cartella principale. Per maggiori informazioni puoi consultare il capitolo [Docker](#docker).

### Frontend - React Client

All'interno della cartella `frontend` è contenuto il client frontend realizzato con l'ausilio di **React** e **Typescript** con l'aggiunta di qualche piccola libreria dell'ecosistema React per la gestione delle rotte e per gestire stili CSS.

Per la comunicazione con il servizio Backend ho utilizzato la libraria **axios**, costruendo un wrapper client con utility ad hoc per renderne l'utilizzo il più facile possiible.

#### Avviare l'applicazione in locale via npm script

Per avviare l'applicazione frontend in locale sul proprio pc sarà sufficiente eseguire all'interno della cartella frontend il comando:

> npm run start

Verrà aperto automaticamente il browser all'indirizzo <http://localhost:8080> che mostrerà l'applicazione React.

***NB 1: l'applicazione client necessità del servizio backend per poter funzionare, pertanto è necessario avviare anche il servizio backend prima di accedere all'applicazione frontend.***

***NB 2: Accertarsi di avere la porta 8080 libera sul proprio ambiente***

#### Test unitari

I test unitari sono stati realizzati con l'ausilio di **jest** e **@testing-library**.

Per eseguire i test unitari in locale sul proprio pc sarà sufficiente eseguire all'interno della cartella frontend il comando:

> npm run test

Per ragioni di tempistiche, la copertura dei test unitari non è totale, ma ho cercato di trovare un buon compromesso fra test unitari e test E2E per assicurare che l'intera applicazione risponda come desiderato.

#### Storybook

In aggiunta il progetto integra la libreria **Storybook** per consulare agelvmente i componenti shared di questo progetto.

Per eseguire storybook in locale sul proprio pc sarà sufficiente eseguire all'interno della cartella frontend il comando:

> npm run storybook

Verrà aperto automaticamente il browser all'indirizzo <http://localhost:6006> che mostrerà l'applicazione storybook.

### Backend

All'interno della cartella `backend` è contenuto il servizio backend **Node** scritto in **Typescript** con l'ausilio della libreria **Fastify** per la definizione delle risorse della server app.

L'applicazione non si interfaccia con un vero database, in quanto reputo che ai fini di questa challenge non sia realmente utile, ma si appoggia a delle banali variabili che fanno da datasource.

Questo servizio chiaramente non è completo di tutte le possibili sfaccettature che si dovrebbero definire su un servizio backend, ma è sicuramente un qualcosa che va oltre un banale mock.

#### Avviare il server in locale via npm script

Per avviare l'applicazione server in locale sul proprio pc sarà sufficiente eseguire all'interno della cartella frontend il comando:

> npm run serve

***NB: Accertarsi di avere la porta 3000 libera sul proprio ambiente***

#### Collection Postman

All'interno della cartella `./backend/doc/postman` è possibile trovare sia il file `collection.json` sia il file `environment.json` da importare sul proprio client postman ai fini di testare le API del servizio backend.

### Test E2E

La cartella `e2e` contiene il progetto specifico per i test e2e che utilizza **Cypress** come strumento per l'esecuzione dei test.
Per la definizione dei test ho utilizzando una libreria derivata da **Cucumber** che permette di sfruttare la **Gherkin syntax** per la definizione delle funzionalità da testare seguendo l'approccio **BDD**.

All'interno della cartella `./e2e/cypress/tests` è possibile trovare tutti i file con estensione `.feature` che descrivono gli step testati. Questo approccio consente di ottenre facilmente sia una documentazione chiara a tutti i membri di un team (tecnici e non tecnici) sia dare un enorme boost nella definizione dei test e2e, in quanto è possibile "riciclare" la definizione javascript dei singoli step su più test.

### Docker

L'intera soluzione è stata dockerizzata al fine di renderne l'esecuzione facile e il quanto più possibile agnostica all'ambiente su cui si lavora.

Per eseguire tutti i servizi via docker e docker-compose sarà sufficiente eseguire il file bash `docker-start-app.sh` all'interno della cartella principale. Nel caso in cui non si riesca ad eseguire il file bash sarà sufficiente eseguire i seguenti comandi:

```bash
docker-compose  build
docker-compose  up  -d  react-challenge-app-backend
docker-compose  up  -d  react-challenge-app-frontend
```

Una volta avviato sia il servizio backend sia il servizio frontend sarà possibile provare l'applicazione all'indirizzo <http://localhost:8080>.

#### E2E test via docker

E' possibile eseguire i test E2E via docker, per farlo sarà sufficiente eseguire il file bash `docker-start-e2e-sh` che si trova all'interno della cartella principale. Nel caso in cui non si riesca ad eseguire il file bash sarà sufficiente eseguire i seguenti comandi:

```bash
mkdir  -p  ./e2e/cypress/report;
docker-compose  up  react-challenge-app-e2e
```

***NB: Accertarsi di avere le porte 8080 e 3000 libere sul proprio ambiente***

Una volta eseguiti i test E2E sarà possibile consultare il report generato da Cypress aprendo con un browser il file html:

> ./e2e/cypress/report/cucumber.html
