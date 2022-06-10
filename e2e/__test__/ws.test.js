const {expect} = require('expect');
const soapRequest = require('easy-soap-request');
const { processResponse } = require('../../src/utils/parsing') 

/*  HARDCODED TEST VALUES (for e2e test) */
const test_username = "XXX";  //TO ADD (as supplied by vendor)
const test_password = "XXX";  //TO ADD (as supplied by vendor)
const test_house_number = "19";
const test_street = "Old Farm Road East";
const test_postcode = "DA15 8AE";

/* SOAP envelope embedding test values */
const SOAP_Envelope = `<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:hyp=\"http://www.calnea-webservice.co.uk/hyperlocal/hyperlocal.asmx\">` +
   `<soapenv:Header/>` +
   `<soapenv:Body>` +
   `   <hyp:getCharacteristics>` +
   `      <hyp:username>${test_username}</hyp:username>` +
   `      <hyp:password>${test_password}</hyp:password>` +
   `      <hyp:reference></hyp:reference>` +
   `      <hyp:buildname></hyp:buildname>` +
   `      <hyp:subBname></hyp:subBname>` +
   `      <hyp:number>${test_house_number}</hyp:number>` +
   `      <hyp:depstreet></hyp:depstreet>` +
   `      <hyp:street>${test_street}</hyp:street>` +
   `      <hyp:postcode>${test_postcode}</hyp:postcode>` +
   `   </hyp:getCharacteristics>` +
   `</soapenv:Body>` +
`</soapenv:Envelope>`;

 /*
   Proven curl command for this service:
   curl -H "Content-Type: text/xml;charset=UTF-8" -H "User-Agent: Apache-HttpClient/4.5.5 (Java/16.0.1)" -H "SOAPAction: \"http://www.calnea-webservice.co.uk/hyperlocal/hyperlocal.asmx/getCharacteristics\"" --data @test.xml http://uat.calnea-webservice.co.uk/hyperlocal/hyperlocal.asmx -v
   (where test.xml is a local file containing the SOAP Envelope)
  */
 
const url = 'http://uat.calnea-webservice.co.uk/hyperlocal/hyperlocal.asmx';

const ws_headers = {
  'User-Agent': 'Apache-HttpClient/4.5.5 (Java/16.0.1)',
  'Content-Type': 'text/xml;charset=UTF-8',
  'SOAPAction': 'http://www.calnea-webservice.co.uk/hyperlocal/hyperlocal.asmx/getCharacteristics'
};

describe('SOAP response parsing of a retreived reponse', () => {

  it('returns an expected set of values', async () => {
    const { response } = await soapRequest({ url: url, headers: ws_headers, xml: SOAP_Envelope, timeout: 1000}); // Optional timeout parameter(milliseconds)
    const { body, statusCode } = response;

    const res_json = processResponse(body);

    const res_obj = JSON.parse(res_json);

    // Note: Status 201 denotes 'Successful response with flexible match' and
    // was observed once when passing a Flat number as well as House Number
    expect(res_obj.responseCode).toBe(200);

    expect(res_obj.requestId).toEqual(expect.any(Number)); //value changes per call
    expect(res_obj.avm).toBe(680000);
    expect(res_obj.minAvm).toBe(537000);
    expect(res_obj.maxAvm).toBe(823000);
    expect(res_obj.rentalAVM).toBe(1790);
    expect(res_obj.minRentalAVM).toBe(1410);
    expect(res_obj.maxRentalAVM).toBe(2170);
    expect(res_obj.propertytype).toBe("S");
    expect(res_obj.tenure).toBe("F");
    expect(res_obj.yearBuilt).toBe("");
    expect(res_obj.bedrooms).toBe("");
    expect(res_obj.hasOwnProperty('commentary')); //verbose value - just checking property found
    
  });

});

