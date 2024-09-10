import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import { ChevronsLeftIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const VesselFinderRoute = () => {
  // State for vessels data
  const [vessels, setVessels] = useState([]);

  useEffect(() => {
    // Fetch vessel data from the API
    const fetchVessels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vessels'); // Update URL if necessary
        setVessels(response.data);
      } catch (error) {
        console.error('Error fetching vessel data:', error);
      }
    };

    fetchVessels();
  }, []);
  // State for selected options
  const [selectedFlag, setSelectedFlag] = useState('-');
  const [selectedType, setSelectedType] = useState('-1');
  const [inputValue, setInputValue] = useState('');

  // Handler for flag selection change
  const handleFlagChange = (value) => {
    setSelectedFlag(value);
  };

  // Handler for type selection change
  const handleTypeChange = (value) => {
    setSelectedType(value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


  const Handle = () => {

    const queryParams = new URLSearchParams({
      name: inputValue,
      type: selectedType,
      flag: selectedFlag,
    }).toString();

    const fetchVessels = async () => {
      try {
        const response = await axios.get(`http://172.19.127.180:5005/api/vessels?${queryParams}`);
        setVessels(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error fetching vessel data:', error);
      }
    };

    fetchVessels();
  }

  return (
    <div className="container mx-auto pb-4">
      <div>
        <h1 className="text-2xl font-semibold mb-4">Vessels Database</h1>
        <form className="flex space-x-4 my-4">
          <Input
            onChange={handleInputChange} 
            type="text" 
            placeholder="Search by Ship name / MMSI / IMO" 
            className="border p-2 w-full rounded" 
          />
          <Select onValueChange={handleFlagChange} value={selectedFlag}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a flag" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="-">Any flag</SelectItem>
            <SelectItem value="xd">Adelie Land</SelectItem>
            <SelectItem value="af">Afghanistan</SelectItem>
            <SelectItem value="ax">Aland Islands</SelectItem>
            <SelectItem value="xc">Alaska</SelectItem>
            <SelectItem value="al">Albania</SelectItem>
            <SelectItem value="dz">Algeria</SelectItem>
            <SelectItem value="as">American Samoa</SelectItem>
            <SelectItem value="ad">Andorra</SelectItem>
            <SelectItem value="ao">Angola</SelectItem>
            <SelectItem value="ai">Anguilla</SelectItem>
            <SelectItem value="aq">Antarctica</SelectItem>
            <SelectItem value="ag">Antigua & Barbuda</SelectItem>
            <SelectItem value="ar">Argentina</SelectItem>
            <SelectItem value="am">Armenia</SelectItem>
            <SelectItem value="aw">Aruba</SelectItem>
            <SelectItem value="xe">Ascension Island</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
            <SelectItem value="at">Austria</SelectItem>
            <SelectItem value="az">Azerbaijan</SelectItem>
            <SelectItem value="xa">Azores</SelectItem>
            <SelectItem value="bs">Bahamas</SelectItem>
            <SelectItem value="bh">Bahrain</SelectItem>
            <SelectItem value="bd">Bangladesh</SelectItem>
            <SelectItem value="bb">Barbados</SelectItem>
            <SelectItem value="by">Belarus</SelectItem>
            <SelectItem value="be">Belgium</SelectItem>
            <SelectItem value="bz">Belize</SelectItem>
            <SelectItem value="bj">Benin</SelectItem>
            <SelectItem value="bm">Bermuda</SelectItem>
            <SelectItem value="bt">Bhutan</SelectItem>
            <SelectItem value="bo">Bolivia</SelectItem>
            <SelectItem value="bq">Bonaire, St Eustatius & Saba</SelectItem>
            <SelectItem value="ba">Bosnia & Herzegovina</SelectItem>
            <SelectItem value="bw">Botswana</SelectItem>
            <SelectItem value="br">Brazil</SelectItem>
            <SelectItem value="io">British Indian Ocean Ter.</SelectItem>
            <SelectItem value="vg">British Virgin Islands</SelectItem>
            <SelectItem value="bn">Brunei</SelectItem>
            <SelectItem value="bg">Bulgaria</SelectItem>
            <SelectItem value="bf">Burkina Faso</SelectItem>
            <SelectItem value="bi">Burundi</SelectItem>
            <SelectItem value="kh">Cambodia</SelectItem>
            <SelectItem value="cm">Cameroon</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="cv">Cape Verde</SelectItem>
            <SelectItem value="ky">Cayman Islands</SelectItem>
            <SelectItem value="cf">Central Africa Rep (CAR)</SelectItem>
            <SelectItem value="TableCell">Chad</SelectItem>
            <SelectItem value="cl">Chile</SelectItem>
            <SelectItem value="cn">China</SelectItem>
            <SelectItem value="cx">Christmas Island</SelectItem>
            <SelectItem value="cc">Cocos Islands</SelectItem>
            <SelectItem value="co">Colombia</SelectItem>
            <SelectItem value="km">Comoros</SelectItem>
            <SelectItem value="cg">Congo</SelectItem>
            <SelectItem value="ck">Cook Islands</SelectItem>
            <SelectItem value="cr">Costa Rica</SelectItem>
            <SelectItem value="ci">Cote d'Ivoire</SelectItem>
            <SelectItem value="hr">Croatia</SelectItem>
            <SelectItem value="xf">Crozet Archipelago</SelectItem>
            <SelectItem value="cu">Cuba</SelectItem>
            <SelectItem value="cw">Curacao</SelectItem>
            <SelectItem value="cy">Cyprus</SelectItem>
            <SelectItem value="cz">Czech Rep</SelectItem>
            <SelectItem value="cd">DR Congo</SelectItem>
            <SelectItem value="dk">Denmark</SelectItem>
            <SelectItem value="dj">Djibouti</SelectItem>
            <SelectItem value="dm">Dominica</SelectItem>
            <SelectItem value="do">Dominican Rep</SelectItem>
            <SelectItem value="ec">Ecuador</SelectItem>
            <SelectItem value="eg">Egypt</SelectItem>
            <SelectItem value="sv">El Salvador</SelectItem>
            <SelectItem value="gq">Equatorial Guinea</SelectItem>
            <SelectItem value="er">Eritrea</SelectItem>
            <SelectItem value="ee">Estonia</SelectItem>
            <SelectItem value="et">Ethiopia</SelectItem>
            <SelectItem value="fo">Faeroe Islands</SelectItem>
            <SelectItem value="fk">Falkland Islands</SelectItem>
            <SelectItem value="fj">Fiji</SelectItem>
            <SelectItem value="fi">Finland</SelectItem>
            <SelectItem value="fr">France</SelectItem>
            <SelectItem value="pf">French Polynesia</SelectItem>
            <SelectItem value="ga">Gabon</SelectItem>
            <SelectItem value="gm">Gambia</SelectItem>
            <SelectItem value="ge">Georgia</SelectItem>
            <SelectItem value="de">Germany</SelectItem>
            <SelectItem value="gh">Ghana</SelectItem>
            <SelectItem value="gi">Gibraltar</SelectItem>
            <SelectItem value="gr">Greece</SelectItem>
            <SelectItem value="gl">Greenland</SelectItem>
            <SelectItem value="gd">Grenada</SelectItem>
            <SelectItem value="gp">Guadeloupe</SelectItem>
            <SelectItem value="gu">Guam</SelectItem>
            <SelectItem value="gt">Guatemala</SelectItem>
            <SelectItem value="gg">Guernsey</SelectItem>
            <SelectItem value="gf">Guiana</SelectItem>
            <SelectItem value="gn">Guinea</SelectItem>
            <SelectItem value="gw">Guinea-Bissau</SelectItem>
            <SelectItem value="gy">Guyana</SelectItem>
            <SelectItem value="ht">Haiti</SelectItem>
            <SelectItem value="hm">Heard Isl & McDonald Isls</SelectItem>
            <SelectItem value="hn">Honduras</SelectItem>
            <SelectItem value="hk">Hong Kong</SelectItem>
            <SelectItem value="hu">Hungary</SelectItem>
            <SelectItem value="is">Iceland</SelectItem>
            <SelectItem value="in" selected>India</SelectItem>
            <SelectItem value="id">Indonesia</SelectItem>
            <SelectItem value="ir">Iran</SelectItem>
            <SelectItem value="iq">Iraq</SelectItem>
            <SelectItem value="ie">Ireland</SelectItem>
            <SelectItem value="im">Isle of Man</SelectItem>
            <SelectItem value="il">Israel</SelectItem>
            <SelectItem value="it">Italy</SelectItem>
            <SelectItem value="jm">Jamaica</SelectItem>
            <SelectItem value="jp">Japan</SelectItem>
            <SelectItem value="je">Jersey</SelectItem>
            <SelectItem value="jo">Jordan</SelectItem>
            <SelectItem value="kz">Kazakhstan</SelectItem>
            <SelectItem value="ke">Kenya</SelectItem>
            <SelectItem value="xg">Kerguelen Islands</SelectItem>
            <SelectItem value="ki">Kiribati</SelectItem>
            <SelectItem value="kr">Korea</SelectItem>
            <SelectItem value="kw">Kuwait</SelectItem>
            <SelectItem value="kg">Kyrgyzstan</SelectItem>
            <SelectItem value="la">Laos</SelectItem>
            <SelectItem value="lv">Latvia</SelectItem>
            <SelectItem value="lb">Lebanon</SelectItem>
            <SelectItem value="ls">Lesotho</SelectItem>
            <SelectItem value="lr">Liberia</SelectItem>
            <SelectItem value="ly">Libya</SelectItem>
            <SelectItem value="li">Liechtenstein</SelectItem>
            <SelectItem value="lt">Lithuania</SelectItem>
            <SelectItem value="lu">Luxembourg</SelectItem>
            <SelectItem value="mo">Macao</SelectItem>
            <SelectItem value="mk">North Macedonia</SelectItem>
            <SelectItem value="mg">Madagascar</SelectItem>
            <SelectItem value="mw">Malawi</SelectItem>
            <SelectItem value="my">Malaysia</SelectItem>
            <SelectItem value="mv">Maldives</SelectItem>
            <SelectItem value="ml">Mali</SelectItem>
            <SelectItem value="mt">Malta</SelectItem>
            <SelectItem value="mh">Marshall Islands</SelectItem>
            <SelectItem value="mq">Martinique</SelectItem>
            <SelectItem value="mr">Mauritania</SelectItem>
            <SelectItem value="mu">Mauritius</SelectItem>
            <SelectItem value="yt">Mayotte</SelectItem>
            <SelectItem value="mx">Mexico</SelectItem>
            <SelectItem value="fm">Micronesia</SelectItem>
            <SelectItem value="md">Moldova</SelectItem>
            <SelectItem value="mc">Monaco</SelectItem>
            <SelectItem value="mn">Mongolia</SelectItem>
            <SelectItem value="me">Montenegro</SelectItem>
            <SelectItem value="ms">Montserrat</SelectItem>
            <SelectItem value="ma">Morocco</SelectItem>
            <SelectItem value="mz">Mozambique</SelectItem>
            <SelectItem value="mm">Myanmar</SelectItem>
            <SelectItem value="na">Namibia</SelectItem>
            <SelectItem value="nr">Nauru</SelectItem>
            <SelectItem value="np">Nepal</SelectItem>
            <SelectItem value="nl">Netherlands</SelectItem>
            <SelectItem value="nc">New Caledonia</SelectItem>
            <SelectItem value="nz">New Zealand</SelectItem>
            <SelectItem value="ni">Nicaragua</SelectItem>
            <SelectItem value="ne">Niger</SelectItem>
            <SelectItem value="ng">Nigeria</SelectItem>
            <SelectItem value="nu">Niue</SelectItem>
            <SelectItem value="nf">Norfolk Island</SelectItem>
            <SelectItem value="kp">North Korea</SelectItem>
            <SelectItem value="mp">Northern Mariana Islands</SelectItem>
            <SelectItem value="no">Norway</SelectItem>
            <SelectItem value="om">Oman</SelectItem>
            <SelectItem value="pk">Pakistan</SelectItem>
            <SelectItem value="pw">Palau</SelectItem>
            <SelectItem value="ps">Palestine</SelectItem>
            <SelectItem value="pa">Panama</SelectItem>
            <SelectItem value="pg">Papua New Guinea</SelectItem>
            <SelectItem value="py">Paraguay</SelectItem>
            <SelectItem value="pe">Peru</SelectItem>
            <SelectItem value="ph">Philippines</SelectItem>
            <SelectItem value="pn">Pitcairn Islands</SelectItem>
            <SelectItem value="pl">Poland</SelectItem>
            <SelectItem value="pt">Portugal</SelectItem>
            <SelectItem value="pr">Puerto Rico</SelectItem>
            <SelectItem value="qa">Qatar</SelectItem>
            <SelectItem value="re">Reunion</SelectItem>
            <SelectItem value="ro">Romania</SelectItem>
            <SelectItem value="ru">Russia</SelectItem>
            <SelectItem value="rw">Rwanda</SelectItem>
            <SelectItem value="bl">Saint Barthelemy</SelectItem>
            <SelectItem value="kn">Saint Kitts and Nevis</SelectItem>
            <SelectItem value="lc">Saint Lucia</SelectItem>
            <SelectItem value="mf">Saint Martin</SelectItem>
            <SelectItem value="pm">Saint Pierre & Miquelon</SelectItem>
            <SelectItem value="vc">Saint Vincent & Grenadines</SelectItem>
            <SelectItem value="ws">Samoa</SelectItem>
            <SelectItem value="sm">San Marino</SelectItem>
            <SelectItem value="sa">Saudi Arabia</SelectItem>
            <SelectItem value="sn">Senegal</SelectItem>
            <SelectItem value="rs">Serbia</SelectItem>
            <SelectItem value="sc">Seychelles</SelectItem>
            <SelectItem value="sl">Sierra Leone</SelectItem>
            <SelectItem value="sg">Singapore</SelectItem>
            <SelectItem value="sx">Sint Maarten</SelectItem>
            <SelectItem value="sk">Slovakia</SelectItem>
            <SelectItem value="si">Slovenia</SelectItem>
            <SelectItem value="sb">Solomon Islands</SelectItem>
            <SelectItem value="so">Somalia</SelectItem>
            <SelectItem value="za">South Africa</SelectItem>
            <SelectItem value="gs">South Georgia</SelectItem>
            <SelectItem value="ss">South Sudan</SelectItem>
            <SelectItem value="es">Spain</SelectItem>
            <SelectItem value="lk">Sri Lanka</SelectItem>
            <SelectItem value="sd">Sudan</SelectItem>
            <SelectItem value="sr">Suriname</SelectItem>
            <SelectItem value="sz">Swaziland</SelectItem>
            <SelectItem value="se">Sweden</SelectItem>
            <SelectItem value="ch">Switzerland</SelectItem>
            <SelectItem value="sy">Syria</SelectItem>
            <SelectItem value="tw">Taiwan</SelectItem>
            <SelectItem value="tj">Tajikistan</SelectItem>
            <SelectItem value="tz">Tanzania</SelectItem>
            <SelectItem value="th">Thailand</SelectItem>
            <SelectItem value="tl">Timor-Leste</SelectItem>
            <SelectItem value="tg">Togo</SelectItem>
            <SelectItem value="tk">Tokelau</SelectItem>
            <SelectItem value="to">Tonga</SelectItem>
            <SelectItem value="tt">Trinidad & Tobago</SelectItem>
            <SelectItem value="tn">Tunisia</SelectItem>
            <SelectItem value="tr">Turkey</SelectItem>
            <SelectItem value="tm">Turkmenistan</SelectItem>
            <SelectItem value="tv">Tuvalu</SelectItem>
            <SelectItem value="ug">Uganda</SelectItem>
            <SelectItem value="ua">Ukraine</SelectItem>
            <SelectItem value="ae">United Arab Emirates</SelectItem>
            <SelectItem value="gb">United Kingdom</SelectItem>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="uy">Uruguay</SelectItem>
            <SelectItem value="uz">Uzbekistan</SelectItem>
            <SelectItem value="vu">Vanuatu</SelectItem>
            <SelectItem value="va">Vatican City</SelectItem>
            <SelectItem value="ve">Venezuela</SelectItem>
            <SelectItem value="vn">Vietnam</SelectItem>
            <SelectItem value="wf">Wallis & Futuna</SelectItem>
            <SelectItem value="eh">Western Sahara</SelectItem>
            <SelectItem value="ye">Yemen</SelectItem>
            <SelectItem value="zm">Zambia</SelectItem>
            <SelectItem value="zw">Zimbabwe</SelectItem>
            </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={handleTypeChange} value={selectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
  <SelectGroup>
    <SelectItem value="-1">Any type</SelectItem>
  </SelectGroup>
  <SelectGroup>
    <SelectLabel>Cargo</SelectLabel>
    <SelectItem value="4">All Cargo Vessels</SelectItem>
    <SelectItem value="401">Bulk carrier</SelectItem>
    <SelectItem value="402">General Cargo</SelectItem>
    <SelectItem value="403">Container Ship</SelectItem>
    <SelectItem value="404">Reefer</SelectItem>
    <SelectItem value="405">Ro-Ro</SelectItem>
    <SelectItem value="406">Vehicles Carrier</SelectItem>
    <SelectItem value="407">Cement Carrier</SelectItem>
    <SelectItem value="408">Wood Chips Carrier</SelectItem>
    <SelectItem value="409">Urea Carrier</SelectItem>
    <SelectItem value="410">Aggregates Carrier</SelectItem>
    <SelectItem value="411">Limestone Carrier</SelectItem>
    <SelectItem value="412">Landing Craft</SelectItem>
    <SelectItem value="413">Livestock Carrier</SelectItem>
    <SelectItem value="414">Heavy Load Carrier</SelectItem>
  </SelectGroup>
  <SelectGroup>
    <SelectLabel>Tankers</SelectLabel>
    <SelectItem value="6">All Tankers</SelectItem>
    <SelectItem value="601">Crude Oil Tanker</SelectItem>
    <SelectItem value="602">Oil Products Tanker</SelectItem>
    <SelectItem value="603">Chemical/Oil Tanker</SelectItem>
    <SelectItem value="604">LNG Tanker</SelectItem>
    <SelectItem value="605">LPG Tanker</SelectItem>
    <SelectItem value="606">Asphalt/Bitumen</SelectItem>
    <SelectItem value="607">Bunkering Tanker</SelectItem>
    <SelectItem value="608">FSO/FPSO</SelectItem>
    <SelectItem value="609">Other Tanker</SelectItem>
  </SelectGroup>
  <SelectGroup>
    <SelectLabel>Passenger/Cruise</SelectLabel>
    <SelectItem value="3">All Passenger/Cruise Ships</SelectItem>
    <SelectItem value="301">Cruise Ship</SelectItem>
    <SelectItem value="302">Passenger/Cargo Ship</SelectItem>
    <SelectItem value="303">Passenger/Ro-Ro Ship</SelectItem>
    <SelectItem value="304">Passenger Ship</SelectItem>
  </SelectGroup>
  <SelectGroup>
    <SelectLabel>Other</SelectLabel>
    <SelectItem value="5">Fishing ships</SelectItem>
    <SelectItem value="8">Yachts/Sailing Vessels</SelectItem>
    <SelectItem value="7">Military</SelectItem>
    <SelectItem value="2">High speed crafts</SelectItem>
    <SelectItem value="0">Other type/ Auxiliary</SelectItem>
    <SelectItem value="1">Unknown</SelectItem>
  </SelectGroup>
</SelectContent>
          </Select>
          <Button className='hover:cursor-pointer' onClick={Handle}>Search</Button>
        </form>
      </div>

      {/* Vessel Table */}
      <Table>
      <TableCaption>A list of vessels.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Vessel</TableHead>
          <TableHead className="w-[150px]">Year Built</TableHead>
          <TableHead className="w-[100px]">GT</TableHead>
          <TableHead className="w-[100px]">DWT</TableHead>
          <TableHead className="w-[100px]">Size</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vessels.map((vessel) => (
          <TableRow key={vessel.name}>
            <TableCell className="flex items-center px-4 py-2 space-x-4">
              <img src={vessel.image_source} alt={vessel.name} className="w-16 h-16 rounded" />
              <div>
                <div className="font-bold">{vessel.name}</div>
                <div className="text-sm text-gray-600">{vessel.size}</div>
              </div>
            </TableCell>
            <TableCell className="px-2 py-2">{vessel.year_built}</TableCell>
            <TableCell className="px-2 py-2">{vessel.gt}</TableCell>
            <TableCell className="px-2 py-2">{vessel.dwt}</TableCell>
            <TableCell className="px-2 py-2">{vessel.size}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
};