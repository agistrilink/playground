<?php
class Http_Response_Code {
	// Informational 1xx
	const HTTP_CONTINUE         = 100;
	const SWITCH_PROTOCOLS      = 101;
	
	// Successful 2xx
	const OK                    = 200;
	const CREATED               = 201;
	const ACCEPTED              = 202;
	const NONAUTHORITATIVE      = 203;
	const NO_CONTENT            = 204;
	const RESET_CONTENT         = 205;
	const PARTIAL_CONTENT       = 206;
	
	// Redirection 3xx
	const MULTIPLE_CHOICES      = 300;
	const MOVED_PERMANENTLY     = 301;
	const FOUND                 = 302;
	const SEE_OTHER             = 303;
	const NOT_MODIFIED          = 304;
	const USE_PROXY             = 305;
	// 306 is deprecated but reserved
	const TEMP_REDIRECT         = 307;
	
	// Client Error 4xx
	const BAD_REQUEST           = 400;
	const UNAUTHORIZED          = 401;
	const PAYMENT_REQUIRED      = 402;
	const FORBIDDEN             = 403;
	const NOT_FOUND             = 404;
	const NOT_ALLOWED           = 405;
	const NOT_ACCEPTABLE        = 406;
	const PROXY_AUTH_REQUIRED   = 407;
	const REQUEST_TIMEOUT       = 408;
	const CONFLICT              = 409;
	const GONE                  = 410;
	const LENGTH_REQUIRED       = 411;
	const PRECONDITION_FAILED   = 412;
	const LARGE_REQUEST_ENTITY  = 413;
	const LONG_REQUEST_URI      = 414;
	const UNSUPPORTED_TYPE      = 415;
	const UNSATISFIABLE_RANGE   = 416;
	const EXPECTATION_FAILED    = 417;
	
	// Server Error 5xx
	const SERVER_ERROR          = 500;
	const NOT_IMPLEMENTED       = 501;
	const BAD_GATEWAY           = 502;
	const UNAVAILABLE           = 503;
	const GATEWAY_TIMEOUT       = 504;
	const UNSUPPORTED_VERSION   = 505;
	const BANDWIDTH_EXCEEDED    = 509;
}
