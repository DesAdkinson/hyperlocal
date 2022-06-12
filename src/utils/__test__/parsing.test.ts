var processResponse_static = require('../parsing').processResponse;

const mock_response = "<?xml version=\"1.0\" encoding=\"utf-8\" ?>" +
  "<response>" +
  "  <characteristics> " +
  "    <requestId>78009</requestId> " +
  "    <avm>610000</avm> " +
  "    <minAvm>500000</minAvm> " +
  "    <maxAvm>720000</maxAvm> " +
  "    <rentalAVM>1880</rentalAVM> " +
  "    <minRentalAVM>1540</minRentalAVM>" +
  "    <maxRentalAVM>2220</maxRentalAVM>" + 
  "    <propertytype>S</propertytype>" + 
  "    <tenure>F</tenure>" + 
  "    <yearBuilt>1935</yearBuilt>" + 
  "    <bedrooms>3</bedrooms>" + 
  "    <responseCode>200</responseCode>" + 
  "    <commentary>Ridge Avenue in Enfield N21 comprises 128 properties. 90 per cent of them are residential (i.e. there are a total of 115 homes in Ridge Avenue). The information provided about the properties on Ridge Avenue are collected from a variety of sources, including third party data, and information sent to us from the general public about Ridge Avenue. The most expensive recorded transaction in Ridge Avenue to date is 19, which sold for £635,000 on 21/02/2014. The least expensive transaction that has been recorded in Ridge Avenue is 2 Bridge Gate. It sold for £23,500 on 20/10/1999. The property sale that has been recorded in Ridge Avenue most recently was 50, which sold for £620,000 on 19/06/2014. Of the 115 homes on Ridge Avenue, 7 are flats (including apartments and maisonettes). 12 of these properties were built 84 years ago. Ridge Avenue has an average current value of £580,861, which makes it similar in price to many of the other places to live in N21 Enfield, where the average house price is £545,406. This price is derived from the free automated valuation estimates provided on the Mouseprice website. These automated valuations are known in the mortgage lending industry as AVMs. There is reasonable AVM coverage for Enfield N21. The property valuation estimates are supported by the 76 transactions recorded in Ridge Avenue by HM Land Registry since the 1st of January 1995. <br /><br />If you live on Ridge Avenue, your nearest primary school is Highfield Primary School on Highfield Road and your nearest secondary school is Winchmore School on Laburnum Grove. Ridge Avenue is great for local amenities. There is a Post Office close by on Bush Hill Parade which is an asset to the community and is a popular resource amongst local residents. Those living on Ridge Avenue can also enjoy the benefits of having a dental surgery nearby on Bury Street West.</commentary>" +
  "  </characteristics>" + 
"</response>";

describe('SOAP response parsing of a MOCK reponse (NO web service invocation)', () => {

  let res_obj = processResponse_static(mock_response);

  it('returns a 200 responseCode', () => {
    expect(res_obj.responseCode).toBe(200);
  });
  
  it('returns a requestId', () => {
    expect(res_obj.requestId).toBe(78009);
  });

  it('returns an AVM', () => {
    expect(res_obj.avm).toBe(610000);
  });

  it('returns a minimum AVM', () => {
    expect(res_obj.minAvm).toBe(500000);
  });

  it('returns a maximum AVM', () => {
    expect(res_obj.maxAvm).toBe(720000);
  });

  it('returns a rental AVM', () => {
    expect(res_obj.rentalAVM).toBe(1880);
  });

  it('returns a minimum rental AVM', () => {
    expect(res_obj.minRentalAVM).toBe(1540);
  });

  it('returns a maximum rental AVM', () => {
    expect(res_obj.maxRentalAVM).toBe(2220);
  });

  it('returns a property type', () => {
    expect(res_obj.propertytype).toBe("S");
  });

  it('returns the tenure', () => {
    expect(res_obj.tenure).toBe("F");
  });

  it('returns the year built', () => {
    expect(res_obj.yearBuilt).toBe(1935);
  });

  it('returns the no. of bedrooms', () => {
    expect(res_obj.bedrooms).toBe(3);
  });

  it('returns a free text commentary', () => {
    expect(res_obj.hasOwnProperty('commentary')); //verbose value - just check that we found the property
  });

});
