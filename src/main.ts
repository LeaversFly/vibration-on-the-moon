import MyApp from './app'
import { rewirteStyle } from './utils/style';

// TODO: 配置插件...
// TODO: 补丁与HACK...
// TODO: 项目初始化...

// 创建应用
const app = new MyApp();
document.body.appendChild(app.view as HTMLCanvasElement);

// 调整body和canvas样式
rewirteStyle(['body', 'canvas'], [
    {
        margin: '0',
        width: '100%',
        height: '100%'
    },
    {
        position: 'fixed',
        top: '0',
        left: '0'
    }
])

// TODO: 创建场景管理器...
// TODO: 全局事件监听...

// 启动应用
app.startGame();