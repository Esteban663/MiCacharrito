import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Alquiler } from "../servicio/alquiler.service";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
