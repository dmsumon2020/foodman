const Footer = () => {
  return (
    <footer className="bg-footerBg bg-no-repeat bg-cover pt-20 pb-10">
      <div className="footer-container w-11/12 md:w-9/12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-white">
          <div className="flex flex-col justify-center">
            <h2 className="text-[30px] font-bold">Food Zone</h2>
            <p className="pt-10">
              Indulge in Bouffe’s exquisite flavors: a gastronomic haven where
              culinary delights meet cozy coffee charm.
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-[30px] font-bold">Address</h2>
            <p className="pt-10">
              Via Stella Street, <br /> 22 Loria Modena MO, <br /> Italy +390 59
              223 912 <br />
              info@bouffepub.com
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-[30px] font-bold">Contact Us</h2>
            <p className="pt-10">
              P: +1 530 347 4607 <br />
              M: +1 693 269 9812 <br />
              F: +198 546 7498 <br />
              info@bouffepub.com
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-[30px] font-bold">Working Hours</h2>
            <div className="pt-10">
              <table
                style={{
                  margin: "0 0 20px",
                  maxWidth: "300px",
                  border: "none",
                }}
              >
                <tbody style={{ border: "none" }}>
                  <tr>
                    <th
                      style={{
                        border: "none",
                        padding: "0.25rem 0",
                        textAlign: "left",
                      }}
                    >
                      Monday – Friday:
                    </th>
                    <td
                      style={{
                        border: "none",
                        padding: "0.25rem 0",
                        textAlign: "right",
                      }}
                    >
                      09:00 – 23:30
                    </td>
                  </tr>
                  <tr>
                    <th
                      style={{
                        border: "none",
                        padding: "0.25rem 0",
                        textAlign: "left",
                      }}
                    >
                      Saturday:
                    </th>
                    <td
                      style={{
                        border: "none",
                        padding: "0.25rem 0",
                        textAlign: "right",
                      }}
                    >
                      09:00 – 00:30
                    </td>
                  </tr>
                  <tr>
                    <th
                      style={{
                        border: "none",
                        padding: "0.25rem 0",
                        textAlign: "left",
                      }}
                    >
                      Sunday:
                    </th>
                    <td
                      style={{
                        border: "none",
                        padding: "0.25rem 0",
                        textAlign: "right",
                      }}
                    >
                      11:00 – 23:00
                    </td>
                  </tr>
                </tbody>
              </table>
              <p style={{ fontSize: ".85rem" }}>
                <em>*We are closed on holidays.</em>
              </p>
            </div>
          </div>
        </div>
        <div className="copyright my-6 pt-12 border-t border-t-white text-center text-white text-xs">
          2024 © Food Zone Restaurant. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
