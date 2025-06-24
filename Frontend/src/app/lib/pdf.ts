/*import { Alquiler } from "../servicio/alquiler.service";

export async function generarPDFDeAlquiler(alquiler: Alquiler, fecha: Date) {
    if (typeof window === 'undefined') {
        // Evita ejecutar en el servidor
        return;
    }

    const pdfMakeModule = await import("pdfmake/build/pdfmake");
    const pdfFontsModule = await import("pdfmake/build/vfs_fonts");
    const pdfMake = pdfMakeModule.default;
    pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;

    const documentDefinition: any = {
        content: [
            { text: "Resumen del Alquiler de Vehículo ---- MiCacharrito", style: "header" },
            { text: `Fecha de generación: ${fecha.toLocaleDateString()}`, alignment: "right", margin: [0, 0, 0, 10] },
            { text: "\n" },
            {
                style: "tableExample",
                table: {
                    widths: ["auto", "*"],
                    body: [
                        ["Número de Alquiler", alquiler?.numero_alquiler ?? ''],
                        ["Identificación del Usuario", alquiler?.usuario?.identificacion ?? ''],
                        ["Placa del Vehículo", alquiler?.vehiculo?.placa ?? ''],
                        ["Fecha de Inicio", alquiler?.fecha_inicio ?? ''],
                        ["Fecha de Entrega", alquiler?.fecha_entrega ?? ''],
                        ["Valor Total", alquiler?.valor_total ? `$${alquiler.valor_total}` : ''],
                        ["Estado", alquiler?.estado ?? '']
                    ]
                },
                layout: "lightHorizontalLines"
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                alignment: "center"
            },
            tableExample: {
                margin: [0, 10, 0, 0]
            }
        }
    };

    pdfMake.createPdf(documentDefinition).open();
}*/
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Alquiler } from "../servicio/alquiler.service";

(pdfMake as any).vfs = pdfFonts.vfs;

export function generarPDFDeAlquiler(alquiler: Alquiler, fecha: Date) {
    console.log('alquiler recibido para PDF:', alquiler);

    const documentDefinition: any = {
        content: [
            
            { text: "Resumen del Alquiler de Vehículo ---- MiCacharrito", style: "header" },
            { text: `Fecha de generación: ${fecha.toLocaleDateString()}`, alignment: "right", margin: [0, 0, 0, 10] },
            { text: "\n" },

            {
                style: "tableExample",
                table: {
                    widths: ["auto", "*"],
                    body: [
                        ["Número de Alquiler", alquiler?.numero_alquiler ?? ''],
                        ["Identificación del Usuario", alquiler?.usuario?.identificacion ?? ''],
                        ["Placa del Vehículo", alquiler?.vehiculo?.placa ?? ''],
                        ["Fecha de Inicio", alquiler?.fecha_inicio ?? ''],
                        ["Fecha de Entrega", alquiler?.fecha_entrega ?? ''],
                        ["Valor Total", alquiler?.valor_total ? `$${alquiler.valor_total}` : ''],
                        ["Estado", alquiler?.estado ?? '']
                    ]
                },
                layout: "lightHorizontalLines"
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                alignment: "center"
            },
            tableExample: {
                margin: [0, 10, 0, 0]
            }
        }
    };

    pdfMake.createPdf(documentDefinition).open();
}

export default generarPDFDeAlquiler;


