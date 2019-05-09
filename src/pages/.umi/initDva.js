import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'global', ...(require('C:/Users/abrah/Downloads/CMPE280-TP/src/models/global.ts').default) });
app.model({ namespace: 'history', ...(require('C:/Users/abrah/Downloads/CMPE280-TP/src/models/history.ts').default) });
app.model({ namespace: 'list', ...(require('C:/Users/abrah/Downloads/CMPE280-TP/src/models/list.ts').default) });
app.model({ namespace: 'login', ...(require('C:/Users/abrah/Downloads/CMPE280-TP/src/models/login.ts').default) });
app.model({ namespace: 'menu', ...(require('C:/Users/abrah/Downloads/CMPE280-TP/src/models/menu.ts').default) });
app.model({ namespace: 'nodes', ...(require('C:/Users/abrah/Downloads/CMPE280-TP/src/models/nodes.ts').default) });
app.model({ namespace: 'project', ...(require('C:/Users/abrah/Downloads/CMPE280-TP/src/models/project.ts').default) });
app.model({ namespace: 'setting', ...(require('C:/Users/abrah/Downloads/CMPE280-TP/src/models/setting.ts').default) });
app.model({ namespace: 'shadows', ...(require('C:/Users/abrah/Downloads/CMPE280-TP/src/models/shadows.ts').default) });
app.model({ namespace: 'user', ...(require('C:/Users/abrah/Downloads/CMPE280-TP/src/models/user.ts').default) });
