const router = require('@/routes/router.js')
import systemConfig from '../systemConfig.json'

const config = {
    projectCode:systemConfig.systemCode,
    projectName: systemConfig.systemName,
    main:"http://localhost:5005/script/main.bundle.js",
    router,
}
export default config;