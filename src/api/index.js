import login from './login' 
import realm from './realm'

import roles from './roles'
import user from './user'
import clients from './clients'
import scopes from './client-scopes'
import session from './session'

import authentication from './authentication'

export default {
    ...login,
    ...realm,
    
    ...roles,
    ...user,
    ...clients,
    ...scopes,
    ...session,

    ...authentication,
} 