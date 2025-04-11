
import login from './login' 
import roles from './roles'
import realm from './realm'
import user from './user'
import clients from './clients'
import scopes from './client-scopes'

export default {
    ...login,
    ...roles,
    ...realm,
    ...user,
    ...clients,
    ...scopes,
} 