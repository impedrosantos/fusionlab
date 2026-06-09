// Portuguese (Portugal) translations.
// To add another language, create a sibling file with the same shape and
// register it in ./index.tsx.

export const pt = {
  nav: {
    contact: 'Contacto',
  },

  footer: {
    tagline: 'Impressão 3D de precisão, camada a camada.',
    studio: 'Estúdio',
    legal: 'Legal',
    privacy: 'Política de Privacidade',
    cookies: 'Cookies',
    copyright: '© {year} FusionLab — todos os direitos reservados.',
    builtWith: '// feito com filamento e código',
  },

  home: {
    kicker: '> a inicializar FusionLab...',
    titleA: 'FUSIONLAB',
    titleAccent1: 'código',
    titleB: 'em',
    titleAccent2: 'objetos',
    sub: 'Estúdio de impressão 3D',
    viewGallery: 'Ver a galeria',
    follow: 'fusionlab0',
    stat1Value: '0,05mm',
    stat1Label: 'altura mínima de camada',
    stat2Value: 'FDM + Resina',
    stat2Label: 'tecnologias de impressão',
    stat3Value: '24/7',
    stat3Label: 'máquinas em funcionamento',
    aboutKicker: '// sobre_nos',
    aboutTitle: 'Construído camada a camada',
    aboutP1:
      'Um pequeno estúdio onde a engenharia encontra o artesanato. Modelamos, fatiamos e imprimimos — e partilhamos aqui os resultados.',
    aboutP2: 'Quer algo impresso? Fale connosco.',
    aboutCta: 'Entrar em contacto',
    terminal: `$ fusionlab --estado
> fatiador ...... pronto
> filamento ..... carregado
> base .......... 60°C
> bico .......... 210°C
> fila .......... a imprimir
✓ todos os sistemas operacionais`,
  },

  gallery: {
    kicker: '// registo_de_impressoes',
    title: 'Galeria',
    empty: 'Ainda não há impressões publicadas — volte em breve.',
    close: 'Fechar',
  },

  privacy: {
    kicker: '// legal',
    title: 'Política de Privacidade',
    updated: 'Última atualização: {year}',
    intro:
      'A FusionLab («nós») respeita a sua privacidade. Esta página explica o que recolhemos quando visita este site e como o utilizamos. Trata-se de um modelo para um site de portefólio estático e deve ser revisto por um profissional antes de ser usado em produção.',
    collectTitle: 'O que recolhemos',
    collectText:
      'Este é um site de demonstração estático. Não exigimos a criação de conta para navegar na galeria. Se nos contactar através do formulário, recebemos o nome, o email e a mensagem que decidir enviar.',
    useTitle: 'Como o utilizamos',
    useText:
      'Utilizamos as informações que nos envia exclusivamente para responder ao seu pedido. Não vendemos nem partilhamos os seus dados pessoais com terceiros para fins de marketing.',
    retentionTitle: 'Conservação dos dados',
    retentionText:
      'As mensagens são conservadas apenas durante o tempo necessário para tratar o seu pedido e depois eliminadas.',
    rightsTitle: 'Os seus direitos',
    rightsText:
      'Pode solicitar o acesso, a correção ou a eliminação de quaisquer dados pessoais que tenha partilhado connosco. Contacte-nos através dos dados na página de contacto.',
    contactTitle: 'Contacto',
    contactTextA: 'Questões sobre esta política? Contacte-nos em',
    contactTextB: 'ou através de',
  },

  cookies: {
    kicker: '// legal',
    title: 'Política de Cookies',
    updated: 'Última atualização: {year}',
    intro:
      'Esta página explica como a FusionLab utiliza cookies e tecnologias de armazenamento local semelhantes. Trata-se de um modelo que deve ser revisto antes de ser usado em produção.',
    whatTitle: 'O que são cookies?',
    whatText:
      'Os cookies são pequenos ficheiros guardados no seu dispositivo. Tecnologias semelhantes, como o localStorage, permitem que um site se lembre de informações entre visitas.',
    useTitle: 'O que utilizamos',
    essentialLabel: 'Armazenamento essencial.',
    essentialText:
      'O backoffice utiliza o Firebase Authentication, que guarda um token de sessão no armazenamento do seu navegador para manter um administrador autenticado.',
    contentLabel: 'Armazenamento de conteúdo.',
    contentText:
      'As publicações da galeria são guardadas no Cloud Firestore e apresentadas a todos os visitantes.',
    trackingLabel: 'Sem rastreio.',
    trackingText: 'Não utilizamos cookies de publicidade nem de análise de terceiros.',
    manageTitle: 'Gerir cookies',
    manageText:
      'Pode limpar os cookies e o armazenamento local a qualquer momento através das definições do seu navegador. Ao fazê-lo, terminará a sessão no backoffice.',
  },

  contact: {
    kicker: '// diz_ola',
    title: 'Contacto',
    intro: 'Tem um modelo para imprimir ou uma questão? Envie uma mensagem.',
    successTitle: '✓ Mensagem enviada.',
    successText:
      'Obrigado {name} — recebemos a sua mensagem e responderemos para {email} em breve.',
    successThere: 'a todos',
    successInbox: 'a sua caixa de entrada',
    sendAnother: 'Enviar outra',
    nameLabel: 'Nome',
    namePlaceholder: 'Robot 023',
    emailLabel: 'Email',
    emailPlaceholder: 'robot@robots.com',
    messageLabel: 'Mensagem',
    messagePlaceholder: 'Diga-nos o que gostaria de imprimir...',
    send: 'Enviar mensagem',
    sending: 'A enviar…',
    error: 'Não foi possível enviar a mensagem. Tente novamente.',
    altText: 'ou encontre-nos em',
  },

  notFound: {
    kicker: '// erro 404',
    title: 'impressao_nao_encontrada',
    text: 'A página que procura escorregou da base de impressão.',
    back: 'Voltar ao início',
  },

  login: {
    title: 'backoffice',
    subtitle: 'autentique-se para continuar',
    userLabel: 'email',
    passwordLabel: 'palavra-passe',
    error: 'Acesso negado — verifique as suas credenciais.',
    submit: '> entrar',
    submitting: '> a autenticar…',
    hint: 'as contas são geridas na consola Firebase',
    back: '← voltar ao site',
  },

  dashboard: {
    title: 'painel',
    signOut: 'terminar sessão',
    newPost: '// nova_publicacao',
    editPost: '// editar_publicacao',
    titleLabel: 'Título',
    titlePlaceholder: 'Vaso Voronoi',
    imageLabel: 'Imagem',
    imagePlaceholder: 'https://…/impressao.jpg',
    imageDrop: 'Arraste uma imagem para aqui',
    imageHint: 'ou clique para escolher do dispositivo',
    imageReplace: 'Clique ou arraste para substituir a imagem',
    imageRemove: 'remover imagem',
    uploading: 'A carregar…',
    imageRequired: 'Adicione uma imagem antes de publicar.',
    imageTypeError: 'O ficheiro tem de ser uma imagem.',
    imageUploadError: 'Falha ao carregar a imagem. Tente novamente.',
    materialLabel: 'Material / definições',
    materialPlaceholder: 'PLA · 0,12mm',
    descriptionLabel: 'Descrição',
    descriptionPlaceholder: 'Algumas palavras sobre esta impressão…',
    preview: 'pré-visualização',
    publish: 'Publicar',
    saveChanges: 'Guardar alterações',
    cancel: 'Cancelar',
    postsTitle: '// publicacoes',
    empty: 'Ainda não há publicações. Crie uma para preencher a galeria.',
    edit: 'editar',
    delete: 'eliminar',
    confirmDelete: 'Eliminar «{title}»? Esta ação não pode ser anulada.',
    tabPosts: '// publicacoes',
    tabMessages: '// mensagens',
    messagesTitle: '// mensagens_recebidas',
    messagesEmpty: 'Ainda não há mensagens. As mensagens do formulário de contacto aparecem aqui.',
    markRead: 'marcar como lida',
    markUnread: 'marcar como não lida',
    confirmDeleteMessage: 'Eliminar a mensagem de {name}? Esta ação não pode ser anulada.',
  },
}

export type Translations = typeof pt
