import requests
from requests.auth import HTTPBasicAuth
import json
import sys

data = {'attributes': {'bar': 577}}
r = requests.put('https://cr.apps.bosch-iot-cloud.com/cr/1/things/markandrew:foo3',
                 verify=False,
                 auth=HTTPBasicAuth('markandrew', 'markandrewPw1!'),
                 headers={"x-cr-api-token": "6af616e401e24aa98425b825da995a7a",
                          "Accept": "application/json",
                          "Content-Type": "application/json"
                          },
                 data=json.dumps(data))
print r

