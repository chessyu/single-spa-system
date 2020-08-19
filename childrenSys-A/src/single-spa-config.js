const router = require('@/routes/router.js')
import systemConfig from '../systemConfig.json'

const config = {
    projectCode:systemConfig.systemCode,
    projectName: systemConfig.systemName,
    main:"http://localhost:8080/script/main.bundle.js",
    router,
}
export default config;