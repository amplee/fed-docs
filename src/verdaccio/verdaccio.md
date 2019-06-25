服务器： 10.237.149.220

## pm2 持续集成

pm2 start verdaccio -i 4 --name="verdaccio"

## 配置文件目录

```
/root/.config/verdaccio
```

## 配置文件

``` yaml
#
# This is the default config file. It allows all users to do anything,
# so don't use it on production systems.
#
# Look here for more config file examples:
# https://github.com/verdaccio/verdaccio/tree/master/conf
#

# path to a directory with all packages
storage: /home/verdaccio/storage
# path to a directory with plugins to include
plugins: /home/verdaccio/plugins

web:
  title: WeHotel Verdaccio
  # comment out to disable gravatar support
  # gravatar: false
  # by default packages are ordercer ascendant (asc|desc)
  # sort_packages: asc
  primary_color: "#4286F5"

auth:
  htpasswd:
    file: /home/verdaccio/htpasswd
    # Maximum amount of users allowed to register, defaults to "+inf".
    # You can set this to -1 to disable registration.
    # max_users: 1000

listen:
  - 0.0.0.0:4873

security:
  api:
    jwt:
      sign:
        expiresIn: 60d
        notBefore: 1
  web:
    sign:
      expiresIn: 7d
      notBefore: 1

# a list of other known repositories we can talk to
uplinks:
  npmjs:
    url: https://registry.npmjs.org/

packages:
  '@*/*':
    # scoped packages
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs

  '**':
    # allow all users (including non-authenticated users) to read and
    # publish all packages
    #
    # you can specify usernames/groupnames (depending on your auth plugin)
    # and three keywords: "$all", "$anonymous", "$authenticated"
    access: $all

    # allow all known users to publish/publish packages
    # (anyone can register by default, remember?)
    publish: $authenticated
    unpublish: $authenticated

    # if package is not available locally, proxy requests to 'npmjs' registry
    proxy: npmjs

# You can specify HTTP/1.1 server keep alive timeout in seconds for incomming connections.
# A value of 0 makes the http server behave similarly to Node.js versions prior to 8.0.0, which did not have a keep-alive timeout.
# WORKAROUND: Through given configuration you can workaround following issue https://github.com/verdaccio/verdaccio/issues/301. Set to 0 in case 60 is not enought.
server:
  keepAliveTimeout: 60

middlewares:
  audit:
    enabled: true

# log settings
logs:
  - { type: stdout, format: pretty, level: http }
  #- {type: file, path: verdaccio.log, level: info}

```