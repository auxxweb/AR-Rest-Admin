import React from 'react';

const PaySlip = () => {
  return (
    <>
    <div className="p-2 mb-2 flex justify-between items-center">
  <h1 className="text-lg font-semibold">Pay Slip</h1>
  <div className="flex">
    <button className="bg-gray-200 font-semibold text-gray-700 px-2 py-1 rounded-sm border-r-2 border-gray-300">CSV</button>
    <button className="bg-gray-200 font-semibold text-gray-700 px-2 py-1 rounded-sm border-r-2 border-gray-300">PDF</button>
    <button className="bg-gray-200 font-semibold text-gray-700 px-2 py-1 rounded-sm">Print</button>
  </div>
</div>
      <div className='p-4 bg-white'>
        <table width={'100%'}>
          <tbody>
            <tr>
              <td>
                <img src="/logonew-auxxweb 1.png" alt='logo' />
              </td>
              <td align='center' valign='top'>
                <u>
                  <h1 className='text-2xl pt-6'>Payslip for the month of Feb 2024</h1>
                </u>
                <p>Dreamguy's Technologies</p>
                <p>3864 Quiet Valley Lane</p>
                <p>Sherman Oaks, CA, 91403</p>
              </td>
              <td valign='top'>
                <h2 align='right' className='text-lg font-bold text-gray-700'>
                  Payslip #49029 <br />
                  Salary Month: March, 2019
                </h2>
              </td>
            </tr>
            <tr>
              <td>
                <p className='text-lg font-semibold mt-8'>John Doe</p>
                <p>Web Designer</p>
                <p>Employee ID: FT-0009</p>
                <p className='mb-4'>Joining Date: 1 Jan 2013</p>
              </td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <div className="container mx-auto mt-4">
          <table width={'100%'}>
            <thead>
              <tr>
                <th align='left' className="p-2">Earnings</th>
                <th align='left' className="p-2">Deductions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td width={'50%'}>
                  <table width={'100%'} className='table-auto border-collapse'>
                    <tbody>
                      <tr className='border'>
                        <td className='p-2' width={'75%'}>Basic Salary</td>
                        <td align='right' className='p-2' width={'25%'}>₹65000</td>
                      </tr>
                      <tr className='border'>
                        <td className='p-2' width={'75%'}>House Rent Allowance (H.R.A.)</td>
                        <td align='right' className='p-2' width={'25%'}>₹500</td>
                      </tr>
                      <tr className='border'>
                        <td className='p-2' width={'75%'}>Conveyance</td>
                        <td align='right' className='p-2' width={'25%'}>₹550</td>
                      </tr>
                      <tr className='border'>
                        <td className='p-2' width={'75%'}>Other Allowance</td>
                        <td align='right' className='p-2' width={'25%'}>₹550</td>
                      </tr>
                      <tr className='border'>
                        <td className='p-2' width={'75%'}>Total Earnings</td>
                        <td align='right' className='p-2' width={'25%'}>₹65000</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td width={'50%'}>
                  <table width={'100%'} className='table-auto border-collapse'>
                    <tbody>
                      <tr className='border'>
                        <td className='p-2' width={'75%'}>Tax Deducted at Source (T.D.S.)</td>
                        <td align='right' className='p-2' width={'25%'}>₹0</td>
                      </tr>
                      <tr className='border'>
                        <td className='p-2' width={'75%'}>Provident Fund</td>
                        <td align='right' className='p-2' width={'25%'}>₹0</td>
                      </tr>
                      <tr className='border'>
                        <td className='p-2' width={'75%'}>ESI</td>
                        <td align='right' className='p-2' width={'25%'}>₹0</td>
                      </tr>
                      <tr className='border'>
                        <td className='p-2' width={'75%'}>Loan</td>
                        <td align='right' className='p-2' width={'25%'}>₹550</td>
                      </tr>
                      <tr className='border'>
                        <td className='p-2' width={'75%'}>Total Deductions</td>
                        <td align='right' className='p-2' width={'25%'}>₹550</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr className='border'>
                <td colSpan="2" className='p-2'>
                  <span className='font-semibold'>Net Salary: ₹59698 (Fifty-nine thousand six hundred and ninety-eight only.)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PaySlip;
