fx_version 'cerulean'
game 'gta5'

author 'Leonardo Peixoto'
description 'Sistema de Garagem - Metrópole'
version '1.0.0'

client_scripts {
    'client/*.js'
}

server_scripts {
    'server/database.js',
    'server/garage.js'
}

shared_script 'shared/types.ts'

ui_page 'nui/dist/index.html'

files {
  'nui/dist/index.html',
  'nui/dist/assets/**/*'
}
