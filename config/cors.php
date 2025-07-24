<?php

return [
    'paths' => ['api/*', 'sanctum/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://192.168.1.36:5173'], //Aqui copiar url del frontend
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
