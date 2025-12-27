import React from 'react';
import Header from '@/components/Header'; 
import Footer from '@/components/Footer';  

const Terms_conditions = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Terms & Conditions of S K Tours & Travels
            </h1>
          </div>

          {/* Introduction Section */}
          <div className="mb-12">
            <div className="space-y-4 text-gray-700 text-justify leading-relaxed">
              <p>
                By accessing or using www.sktt.in, you agree to be bound by these Terms & Conditions. 
                S K Tours & Travels provides the following services:
              </p>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-10">
            
            {/* Section 1 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-gray-800 font-bold mr-4">1)</span>
                Services Offered
              </h3>
              <div className="space-y-4 text-gray-700 ml-12 text-justify leading-relaxed">
                <p className="font-semibold mb-2">S K Tours & Travels provides:</p>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>Inbound & Outbound Tours</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>Flight Ticket Booking (Online & Offline)</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>Hotel Reservations</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>MICE, Exhibitions, Group Tours, Senior Citizen, Only Ladies, Festivals Students, Cycle & Bike Tours and many more.</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>Customized travel services</span>
                  </div>
                </div>
                <p className="mt-3">
                  All bookings are subject to availability and supplier terms.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-gray-800 font-bold mr-4">2)</span>
                Data Acquisition
              </h3>
              <div className="space-y-4 text-gray-700 ml-12 text-justify leading-relaxed">
                <p>
                  S K Tours & Travels shall collect personal data exclusively for the purpose of rendering 
                  travel-related services and effectuating contractual duties. The data collected shall be 
                  limited, relevant, and necessary for legitimate business operations conducted in accordance 
                  with applicable law.
                </p>
                <p className="font-semibold mt-4">Categories of data potentially subject to collection include:</p>
                
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    <span className="inline-block mr-2">•</span>
                    Personally Identifiable Information
                  </h4>
                  <div className="ml-6">
                    <p>
                      Full legal name, contact particulars inclusive of mobile telephone number and 
                      electronic mail address, and domicile address where exigent for invoicing or 
                      record-keeping.
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    <span className="inline-block mr-2">•</span>
                    Travel and Booking Particulars
                  </h4>
                  <div className="ml-6">
                    <p>
                      Travel preferences, itinerary specifications, stipulations for reservations, and 
                      data indispensable for the processing of airline tickets, lodging accommodations, 
                      tour packages, visa applications, Meetings, Incentives, Conferences, and Exhibitions 
                      (MICE) services, and kindred travel arrangements.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-gray-800 font-bold mr-4">3)</span>
                Booking & Confirmation
              </h3>
              <div className="space-y-3 text-gray-700 ml-12 text-justify leading-relaxed">
                <div className="flex">
                  <span className="font-semibold text-gray-800 mr-3">•</span>
                  <span>Bookings are confirmed only after full or partial payment, as applicable</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-gray-800 mr-3">•</span>
                  <span>Prices may change until booking is confirmed</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-gray-800 mr-3">•</span>
                  <span>Customers are responsible for providing accurate travel details</span>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-gray-800 font-bold mr-4">4)</span>
                Payments
              </h3>
              <div className="space-y-4 text-gray-700 ml-12 text-justify leading-relaxed">
                <p className="font-semibold">We accept:</p>
                <div className="space-y-2 ml-4">
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>Credit/Debit Cards</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>NEFT / Bank Transfer</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>UPI (Google Pay)</span>
                  </div>
                </div>
                <p className="mt-3">
                  Any payment made confirms acceptance of our cancellation and refund policy.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-gray-800 font-bold mr-4">5)</span>
                Travel Documents
              </h3>
              <div className="space-y-4 text-gray-700 ml-12 text-justify leading-relaxed">
                <p className="font-semibold">Customers are solely responsible for:</p>
                <div className="space-y-2 ml-4">
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>Valid passport and visas</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>Health certificates and travel insurance</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>Compliance with immigration laws</span>
                  </div>
                </div>
                <p className="mt-3">
                  We are not responsible for denied boarding or entry due to document issues.
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-gray-800 font-bold mr-4">6)</span>
                Government-Issued Identification Documents
              </h3>
              <div className="space-y-3 text-gray-700 ml-12 text-justify leading-relaxed">
                <p>
                  Passport data or other travel instruments, collected solely when compulsory for airline 
                  reservations, hotel registration, visa procurement, or as mandated by applicable statutes 
                  and regulatory bodies.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-gray-800 font-bold mr-4">7)</span>
                Passport Handling Disclaimer
              </h3>
              <div className="space-y-4 text-gray-700 ml-12 text-justify leading-relaxed">
                <p>
                  S K Tours & Travels acts solely as a facilitation and service provider for visa and 
                  travel-related documentation. While all reasonable care and precautions are taken in 
                  handling passports and related documents, S K Tours & Travels shall not be held liable 
                  or responsible for any loss, damage, delay, or deterioration of passports arising due 
                  to circumstances beyond its reasonable control.
                </p>
                <p className="font-semibold mt-3">This includes, but is not limited to, loss or damage occurring:</p>
                <div className="space-y-2 ml-4">
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>During transit through courier or delivery services</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>While in transit to or from embassies, consulates, visa centres, airlines, or other authorities</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>Due to theft, fire, natural calamities, heavy rainfall, flooding, or other force majeure events</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>While securely stored in office premises, lockers, cupboards, or storage facilities</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>Due to accidental damage, wear and tear, or unforeseen incidents during handling or processing</span>
                  </div>
                </div>
                <p className="mt-3">
                  In the event a passport is lost, damaged, or rendered unusable while in transit or during 
                  processing, the responsibility for obtaining a replacement passport or reissuing travel 
                  documents shall rest solely with the customer. Any costs, delays, or consequences arising 
                  therefrom shall not be the liability of S K Tours & Travels.
                </p>
                <p>
                  By submitting a passport to S K Tours & Travels, the customer acknowledges and accepts 
                  this risk and agrees to the terms stated above.
                </p>
              </div>
            </div>

            {/* Section 8 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-gray-800 font-bold mr-4">8)</span>
                Submission of Documents for Visa
              </h3>
              <div className="space-y-4 text-gray-700 ml-12 text-justify leading-relaxed">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Visa Documentation Disclaimer & Customer Responsibility</h4>
                <p>
                  S K Tours & Travels acts solely as a facilitator for visa application and related travel 
                  services. The customer is solely responsible for the accuracy, authenticity, completeness, 
                  and legality of all documents, information, and declarations submitted for visa processing.
                </p>
                
                <h4 className="text-xl font-semibold text-gray-800 mt-4 mb-3">Authenticity of Documents</h4>
                <p>The customer expressly confirms and undertakes that:</p>
                <div className="space-y-2 ml-4 mt-2">
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>All documents provided are genuine, true, complete, and legally valid.</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>No document submitted is forged, fabricated, altered, misleading, or obtained through unlawful means</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>All information supplied is accurate and consistent with records held by issuing authorities</span>
                  </div>
                </div>
                <p className="mt-3">
                  S K Tours & Travels shall not be obligated to independently verify the authenticity of 
                  documents submitted by the customer and shall not be liable for any consequences arising 
                  from the submission of false, forged, incomplete, or misleading documents.
                </p>
                
                <h4 className="text-xl font-semibold text-gray-800 mt-4 mb-3">Requirement of Original Documents</h4>
                <p>
                  The customer agrees to submit original documents wherever required by the relevant 
                  embassy, consulate, visa application centre, airline, or authority. Failure to provide 
                  original documents when required may result in rejection, delay, or cancellation of the 
                  visa application, for which S K Tours & Travels shall bear no responsibility. No visa 
                  fees will be refunded if the passport is submitted in the consulate.
                </p>
                
                <h4 className="text-xl font-semibold text-gray-800 mt-4 mb-3">Passport Handling Disclaimer</h4>
                <p>
                  S K Tours & Travels functions exclusively as a facilitator and service vendor for visa 
                  and travel documentation. Although commercially reasonable efforts are employed in the 
                  management of passports and associated documents, S K Tours & Travels assumes no liability 
                  or responsibility for any loss, damage, delay, or deterioration of passports proximately 
                  caused by events outside its reasonable control.
                </p>
                <p className="mt-3">
                  This disclaimer encompasses, but is not limited to, loss or damage occurring during 
                  conveyance via courier or delivery services, while en route to or from embassies, 
                  consulates, visa application centres, airlines, or other governmental authorities, as 
                  a result of theft, fire, acts of God, inclement weather including but not limited to 
                  heavy rainfall or flooding, or other force majeure events, during secure storage within 
                  office premises, lockers, or storage facilities, due to accidental damage, ordinary 
                  wear and tear, or unforeseen incidents arising during handling or processing.
                </p>
                <p className="mt-3">
                  In the exigent circumstance of a passport being lost, damaged, or rendered unusable 
                  during transit or processing, the sole responsibility for procuring a replacement 
                  passport or reissue of travel documents shall vest exclusively with the customer. Any 
                  costs, delays, or consequential damages arising therefrom shall not be the liability 
                  of S K Tours & Travels.
                </p>
                <p className="mt-3">
                  By tendering a passport to S K Tours & Travels, the customer acknowledges and accepts 
                  this risk and agrees to be bound by the aforementioned terms and conditions.
                </p>
              </div>
            </div>

            {/* Section 9 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-gray-800 font-bold mr-4">9)</span>
                Liability & Consequences
              </h3>
              <div className="space-y-4 text-gray-700 ml-12 text-justify leading-relaxed">
                <p>
                  Any rejection, delay, cancellation, blacklisting, legal action, penalty, or adverse 
                  decision by an embassy, consulate, or authority arising due to:
                </p>
                <div className="space-y-2 ml-4">
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>Forged or incorrect documents</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>Misrepresentation or suppression of material facts</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>Failure to provide original documents shall be the sole responsibility of the customer.</span>
                  </div>
                </div>
                <p className="mt-3">
                  The customer agrees to indemnify and hold harmless S K Tours & Travels from any loss, 
                  damage, cost, penalty, or legal consequence arising from such acts or omissions.
                </p>
              </div>
            </div>

            {/* Section 10 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-gray-800 font-bold mr-4">10)</span>
                Visa Rules
              </h3>
              <div className="space-y-4 text-gray-700 ml-12 text-justify leading-relaxed">
                <p>
                  The grant or denial of a visa is at the sole discretion of the consular officer. The 
                  immigration authority's determination shall be final and binding. S K Tours & Travels 
                  assumes no responsibility for the adjudication of visa applications.
                </p>
                <p>
                  In the event of visa refusal or non-issuance, all visa fees and service charges are 
                  non-refundable. Furthermore, VFS charges, demand draft charges, courier fees, Urgent 
                  Visa Fees, lounge access fees, document verification and uploading fees levied by the 
                  consulate, or any other assessable charges, in addition to visa fees and service charges, 
                  shall be the exclusive and non-recoverable responsibility of the applicant.
                </p>
              </div>
            </div>

            {/* Section 11 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-gray-800 font-bold mr-4">11)</span>
                Visa Rejections
              </h3>
              <div className="space-y-3 text-gray-700 ml-12 text-justify leading-relaxed">
                <p>
                  In the event that the customer, whether traveling individually or as part of a group, 
                  utilizes our services for visa application processing, and the visa is subsequently 
                  denied for any reason, thereby resulting in the cancellation of confirmed hotel 
                  reservations, flight tickets, or tour bookings, the customer shall be liable for all 
                  applicable cancellation charges and fees, which shall be governed by our established 
                  cancellation policy.
                </p>
              </div>
            </div>

            {/* Section 12 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-gray-800 font-bold mr-4">12)</span>
                Right to Refuse Service
              </h3>
              <div className="space-y-3 text-gray-700 ml-12 text-justify leading-relaxed">
                <p>
                  S K Tours & Travels reserves the right to refuse, suspend, or cancel visa services 
                  without refund if, at any stage, the documents provided are found or reasonably 
                  suspected to be false, forged, or misleading.
                </p>
              </div>
            </div>

            {/* Section 13 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-gray-800 font-bold mr-4">13)</span>
                Group Departure Rules
              </h3>
              <div className="space-y-4 text-gray-700 ml-12 text-justify leading-relaxed">
                <p>
                  In the event of a publicly announced group tour, S K Tours & Travels reserves the 
                  right, at its sole discretion, to consolidate two separate departure dates into a 
                  single group departure, should the requisite quorum for a specific departure date 
                  fail to materialize.
                </p>
                <p>
                  A tour escort shall be designated solely where the aggregate number of adult 
                  participants exceeds twenty individuals traveling conjunctly; should the group 
                  comprise fewer than twenty adults, a local tour escort shall be furnished.
                </p>
                <p>
                  In the event of illness, accident, or other medical exigency necessitating 
                  hospitalization of any group member, assistance shall be rendered to facilitate 
                  admittance to a medical facility; however, the affected participant shall be 
                  responsible for maintaining a valid Overseas Mediclaim policy or for remitting 
                  all medical expenses incurred. The tour shall proceed without interruption, and 
                  the local purveyor shall maintain communication with the participant, furnishing 
                  updates regarding their medical status.
                </p>
              </div>
            </div>

            {/* Section 14 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-gray-800 font-bold mr-4">14)</span>
                Insurance
              </h3>
              <div className="space-y-4 text-gray-700 ml-12 text-justify leading-relaxed">
                <p>
                  Clients are hereby advised and urged to procure sufficient Insurance Coverage 
                  and Overseas Travel Insurance to defray expenses related to hospitalization, 
                  accidental injury, or other exigencies during the pendency of the tour. S K 
                  Tour & Travels acts solely as a facilitator for travel insurance for guests 
                  up to the age of 70 years where such insurance is a mandatory requirement; 
                  guests exceeding 70 years of age shall be responsible for payment of differential 
                  insurance premiums in addition to the stipulated tour tariff.
                </p>
                <p>
                  It is incumbent upon the guest(s) to provide full disclosure of any pre-existing 
                  medical conditions to the Insurance Company that may impair their ability to fully 
                  participate in and complete the tour. The Insurance Company and/or its designated 
                  service provider reserve the unfettered right to demand written certification 
                  attesting to the guest(s)' medical fitness prior to departure.
                </p>
                <p>
                  S K Tours & Travels functions exclusively as an insurance facilitator and shall 
                  bear no liability or responsibility whatsoever for the adjudication or settlement 
                  of insurance claims; such matters shall be resolved solely between the concerned 
                  insurance company and the guest(s).
                </p>
                <p>
                  Clients are cautioned against carrying valuables on the tour and are encouraged 
                  to secure said valuables within their cargo baggage. In the regrettable event of 
                  hospitalization and/or demise occurring during the tour, the sole responsibility 
                  for contacting insurance authorities and submitting the requisite claim documentation 
                  for claim processing shall rest exclusively with the guest(s) and/or the designated 
                  relative(s) of the hospitalized individual or the deceased.
                </p>
              </div>
            </div>

            {/* Section 15 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-gray-800 font-bold mr-4">15)</span>
                Transportation Failure
              </h3>
              <div className="space-y-3 text-gray-700 ml-12 text-justify leading-relaxed">
                <p>
                  In the event of a vehicular malfunction, be it a car or bus, during a group or 
                  individual tour, the provider shall endeavour to furnish a replacement vehicle 
                  at the earliest practicable opportunity. The customer is expected to maintain 
                  composure pending the arrangement of substitute transportation.
                </p>
              </div>
            </div>

            {/* Section 16 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-gray-800 font-bold mr-4">16)</span>
                Loans & EMI for Tour
              </h3>
              <div className="space-y-3 text-gray-700 ml-12 text-justify leading-relaxed">
                <p>
                  The Company hereby acknowledges the availability of loan facilities extended by 
                  private, cooperative banks, and financial institutions to eligible patrons for 
                  tour packages; however, S K Tours & Travels shall not be held responsible or 
                  liable for the grant, rejection, refund, or repayment of such loan facilities. 
                  In the event of loan rejection, a nominal administrative service charge shall 
                  be levied upon the patron.
                </p>
              </div>
            </div>

            {/* Section 17 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-gray-800 font-bold mr-4">17)</span>
                Postpone or Prepone
              </h3>
              <div className="space-y-3 text-gray-700 ml-12 text-justify leading-relaxed">
                <p>
                  In the event of any modification, postponement, or rescheduling of tour, flight, 
                  or hotel dates initiated by the customer, applicable charges may be levied, 
                  potentially encompassing any differential in airfare which shall be the customer's 
                  sole responsibility should such changes be elected.
                </p>
              </div>
            </div>

            {/* Section 18 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-gray-800 font-bold mr-4">18)</span>
                Limitation of Liability
              </h3>
              <div className="space-y-4 text-gray-700 ml-12 text-justify leading-relaxed">
                <p>
                  S K Tours & Travels acts as a booking agent and shall not be liable for:
                </p>
                <div className="space-y-2 ml-4">
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>Airline delays, cancellations, or overbooking</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>Hotel service quality or changes</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>Natural disasters, strikes, pandemics, political unrest</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>Loss of baggage or personal belongings</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>
                      In the event that the aforementioned Airlines, for any reason, including but not 
                      limited to bankruptcy, labour strike, governmental regulation, or a public health 
                      emergency such as a pandemic compelling the grounding of services, ceases operations 
                      and is thereby unable to remit a refund for the ticket amount to our Agency, the 
                      customer shall have no recourse against S K Tours & Travels for said refund.
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 mr-3">•</span>
                    <span>
                      Our travel agency shall endeavour to provide reasonable assistance and furnish 
                      available alternatives to facilitate the patron's return to their intended 
                      destination; however, any costs associated with the procurement of a replacement 
                      ticket shall be the sole responsibility and borne exclusively by the customer.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 19 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-gray-800 font-bold mr-4">19)</span>
                Governing Law
              </h3>
              <div className="space-y-3 text-red-700 ml-12 text-justify leading-relaxed">
                <p>
                  These terms shall be governed by the laws of India. Jurisdiction shall be <b>Mumbai, 
                  Maharashtra only</b>.
                </p>
              </div>
            </div>

          </div>
        </div>
        
        <Footer />
      </div>
    </>
  )
}

export default Terms_conditions;