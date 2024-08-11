# Installation

1. **Cloning a repository**:

   ```bash
   git clone https://github.com/Vlaek/GitHubChecker.git
   cd GitHubChecker
   ```

2. **Installing dependencies**:

   ```bash
   npm install
   ```

   ```bash
   yarn
   ```

3. **Creation .env file to the root of the project**:

   ```bash
   touch .env
   ```

4. **Write your github api token in the .env file**:

   ```bash
   VITE_GITHUB_TOKEN=<GITHUB_API_TOKEN>
   ```

5. **Launching the application**:

   ```bash
   npm start
   ```

   ```bash
   yarn dev
   ```

#

```plaintext
src/
│
├── components/
│   ├── index.ts
│   └── Component/
│         ├── Component.tsx
│         └── Component.module.scss
│
├── containers/
│   ├── index.ts
│   └── Container/
│         ├── Container.tsx
│         └── Container.module.scss
│
├── graphql/
│   ├── client.ts
│   └── queries.ts
│
├── shared/
│   ├── styles/
│   └── types/
│
├── store/
│   ├── store.ts
│   └── slices/
│         └── Slice.ts
│
└── main.tsx
```

# Technologies

- React
- TypeScript
- Zustand
- SCSS, CSS Modules
- MUI
- Axios
- Redux Toolkit
- graphql
- Vite

# Illustrations

![MainPage](https://i.imgur.com/evtWiXk.jpeg 'MainPage')
![Search](https://i.imgur.com/aJNimgX.jpeg 'Search')
![SearchAside](https://i.imgur.com/zDzncLE.jpeg 'Search and Aside')
![SearchAside2](https://i.imgur.com/S5iwhKA.jpeg 'Search and Aside 2')
