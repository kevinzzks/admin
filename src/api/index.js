
import login from './login' 
import roles from './roles'
import realm from './realm'
import user from './user'
import clients from './clients'

export default {
    ...login,
    ...roles,
    ...realm,
    ...user,
    ...clients,
} 