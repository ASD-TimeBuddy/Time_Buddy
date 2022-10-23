# # # validator.py from https://auth0.com/docs/quickstart/backend/django/interactive

# # import json
# # from urllib.request import urlopen

# # from authlib.oauth2.rfc7523 import JWTBearerTokenValidator
# # from authlib.jose.rfc7517.jwk import JsonWebKey


# # class Auth0JWTBearerTokenValidator(JWTBearerTokenValidator):
# #     def __init__(self, domain, audience):
# #         issuer = f"https://{domain}/"
# #         jsonurl = urlopen(f"{issuer}.well-known/jwks.json")
# #         public_key = JsonWebKey.import_key_set(
# #             json.loads(jsonurl.read())
# #         )
# #         super(Auth0JWTBearerTokenValidator, self).__init__(
# #             public_key
# #         )
# #         self.claims_options = {
# #             "exp": {"essential": True},
# #             "aud": {"essential": True, "value": audience},
# #             "iss": {"essential": True, "value": issuer},
# #         }

# # validator.py from https://tamerlan.dev/integrating-auth0-with-drf/
# from time_buddy.settings import DOMAIN, AUDIENCE 
# from auth0.v3.authentication.token_verifier import AsymmetricSignatureVerifier, TokenValidationError


# #AUTH0_DOMAIN = DOMAIN
# AUTH0_JWKS = 'https://{}/.well-known/jwks.json'.format(DOMAIN)

# def validate_token(token):
# 	signiture_verifier = AsymmetricSignatureVerifier(AUTH0_JWKS)
#     try:
#         jwt_payload = signiture_verifier(token)
#         return True
#     except TokenValidationError:
#         return False