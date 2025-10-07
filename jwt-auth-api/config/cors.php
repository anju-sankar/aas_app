<?php

return [

    'paths' => ['api/*', 'auth/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],        // allow all HTTP methods (GET, POST, OPTIONS...)
    'allowed_origins' => ['*'], // React frontend URL
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],        // allow all headers
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,   // set true if using cookies
];
