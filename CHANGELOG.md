1.10
========
Redeploy due to deployment issues

1.09
========
Fixed deserialisation issue with asp web api when json content is formatted in batch request

1.08
========
Fixed issue in IE11 that was stripping leading '/' on urls which in turned caused the routing in web api to fail.

1.07
========
Fixed deploy issue

1.06
========
Fixed deploy issue

1.0.5
========
Added ability to have fine grained control over the request that get batched by adding an optional canBatchRequest function on the configuration object.

1.0.4
========
Fix to header parsing that would truncate a return header if there was a space it's value i.e. Header: Some Value

1.0.3
========
Build update

1.0.2
=========
- Fixed issue with custom headers not being serialised correctly

1.0.1
========

1.0.0
========
Initial release!
