export interface OrderConfirmProps {
    order: {
        id: string;
    };
    products: Array<{
        title: string;
    }>;
    total: number;
}

export const orderConfimTemplate = ({ order, products, total }: OrderConfirmProps) => {
    return `
    <html>
    <head>
    </head>
    <body>
        <div style="width: 100%; padding: 10px; text-align:center; color:black;">
            <div style="text-align:center; margin-top: 40px;">
                <h1 style="font-size:xx-large; color:black;"><b>Ention Technology and Service Private Limited</b></h1>
            </div>
            <hr />
            <p style="margin-top: 20px; margin-bottom: 20px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 512 512">
                    <path d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z" style="fill:none;stroke:rgb(157, 156, 156);stroke-miterlimit:10;stroke-width:32px" fill="#737373" stroke="#d0cdcd"></path>
                    <polyline points="352 176 217.6 336 160 272" style="fill:none;stroke:rgb(154, 152, 152);stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></polyline>
                </svg>
            </p>
            <h4 style="font-size:xx-large;"><b>Thank you for placing your order with our store!</b></h4>
            <p style="margin-top: 20px; font-size:x-large; margin-bottom: 20px;">This email is to confirm your recent order</p>
            <br />
            <p style="font-size:x-large;">Order Id: <b>${order.id}</b></p>
            <br />
            <br />
            ${products && products.length ? `
                <table style="text-align:center; margin-left: auto; margin-right: auto; font-size:x-large; width: 80%;">
                    <thead>
                        <tr style="background-color:#000;">
                            <th style="font-size:x-large; color:#fff; padding: 20px;">Product</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${products.map(product => `
                            <tr>
                                <td style="padding: 20px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; background-color: #a6a9ab;">${product.title}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
              ` : ''
        }
            <div style="margin: 40px auto; width: 80%; display: flex; justify-content: center;">
                <table style="width: 100%; border-top: 2px solid #717070; border-bottom: 2px solid #858383;">
                    <tr>
                        <td style="padding: 20px; font-size: xx-large; font-weight: bold; text-align: left;">Total</td>
                        <td style="padding: 20px; font-size: xx-large; font-weight: bold; text-align: right;">₹${total.toLocaleString('en-IN')}</td>
                    </tr>
                </table>
            </div>
            <br />
            <br />
            <p style="padding: 20px 0;">
                <span style="margin: 0 10px;">SOCIALS</span>
            </p>
            <p style="font-size:medium; padding: 20px 0; font-size:x-large;">This email was sent by Ention.<br/>
                To ensure deliver to your inbox, add ention to your safe list.
            </p>
        </div>
    </body>
    </html>
  `;
};
