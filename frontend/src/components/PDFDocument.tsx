import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';
import { RepairNoteType } from '../types';
import template from '../assets/template.png';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 40,
    maxHeight: '100vh',
    display: 'flex',
  },
  view: {
    display: 'flex',
    alignItems: 'center',
  },
  template: {
    width: '80%',
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '50vh',
  },
  data: {
    width: '50%',
    padding: '20px',
    border: '2px solid black',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '32px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '20px',
    justifyContent: 'space-between',
    width: '100%',
    marginHorizontal: 'auto',
    gap: '10px',
  },
  label: {
    fontWeight: 'bold',
  },
  emptyColumn: {
    width: '48%',
    border: '2px solid black',
    minHeight: 200,
    padding: 20,
    fontSize: '32px',
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  idContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '50px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  warning: {
    border: '2px solid black',
    padding: '24px',
    fontSize: '20px',
  },
  warningTitle: {
    fontSize: '30px',
  },
  machinesContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    border: '1px solid black',
    padding: '10px',
    flexGrow: 1,
  },
  machinesTitle: {
    fontSize: '30px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  machineData: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignContent: 'center',
    justifyContent: 'space-around',
    fontSize: '20px',
  },
  machineText: {
    borderBottom: '1px solid gray',
    width: '100%',
  },
});

function PDFDocument({ note }: { note: Partial<RepairNoteType> }) {
  return (
    <Document>
      <Page size='A1' orientation='portrait' style={styles.page}>
        <View>
          <View style={styles.view}>
            <Image src={template} style={styles.template} />
          </View>
          <View style={styles.idContainer}>
            <Text>Nota de reparación No.{note.id}</Text>
          </View>
          <View style={styles.dataContainer}>
            <View style={styles.data}>
              <View style={styles.row}>
                <Text style={styles.label}>Fecha de Entrada:</Text>
                <Text>{new Date(note?.entryDate as Date).toLocaleDateString('es-ES')}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Cliente:</Text>
                <Text>{note.client}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Número de Teléfono:</Text>
                <Text>{note.phoneNumber}</Text>
              </View>
              <Text style={styles.machinesTitle}>Máquinas</Text>
              <View style={styles.machinesContainer}>
                <View style={styles.machineData}>
                  {note.model?.split('|').map((machine) => {
                    return (
                      <View style={styles.machineText}>
                        <Text>{machine}</Text>
                      </View>
                    );
                  })}
                </View>
                <View style={styles.machineData}>
                  {note.malfunction?.split('|').map((malfunction) => {
                    return (
                      <View style={styles.machineText}>
                        <Text>{malfunction}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Reparación garantía:</Text>
                <Text>{note.garanty ? 'Sí' : 'No'}</Text>
              </View>
              <View style={styles.warning}>
                <Text style={styles.warningTitle}>Nota de interés para el cliente</Text>
                <Text>
                  * Para la recogida de la maquinaria es imprescindible la entrega de este resguardo
                </Text>
                <Text>
                  * Los presupuestos de reparación que no sean aceptados se les sobrará el valor del
                  tiempo aplicado a la elaboración de dicho presupuesto
                </Text>
                <Text>
                  * Se prevee un plazo de 90 días desde la fecha de admisión de la máquina para ser
                  retirada, de lo contrario se entenderá abandonada autorizando su desguace
                </Text>
              </View>
            </View>
            <View style={styles.emptyColumn}>
              <Text style={styles.label}>MATERIALES EMPLEADOS</Text>
              <Text>MANO DE OBRA ____________________ HORAS</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.view}>
            <Image src={template} style={styles.template} />
          </View>
          <View style={styles.idContainer}>
            <Text>Nota de reparación No.{note.id}</Text>
          </View>
          <View style={styles.dataContainer}>
            <View style={styles.data}>
              <View style={styles.row}>
                <Text style={styles.label}>Fecha de Entrada:</Text>
                <Text>{new Date(note?.entryDate as Date).toLocaleDateString('es-ES')}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Cliente:</Text>
                <Text>{note.client}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Número de Teléfono:</Text>
                <Text>{note.phoneNumber}</Text>
              </View>
              <Text style={styles.machinesTitle}>Máquinas</Text>
              <View style={styles.machinesContainer}>
                <View style={styles.machineData}>
                  {note.model?.split('|').map((machine) => {
                    return (
                      <View style={styles.machineText}>
                        <Text>{machine}</Text>
                      </View>
                    );
                  })}
                </View>
                <View style={styles.machineData}>
                  {note.malfunction?.split('|').map((malfunction) => {
                    return (
                      <View style={styles.machineText}>
                        <Text>{malfunction}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Reparación garantía:</Text>
                <Text>{note.garanty ? 'Sí' : 'No'}</Text>
              </View>
              <View style={styles.warning}>
                <Text style={styles.warningTitle}>Nota de interés para el cliente</Text>
                <Text>
                  * Para la recogida de la maquinaria es imprescindible la entrega de este resguardo
                </Text>
                <Text>
                  * Los presupuestos de reparación que no sean aceptados se les sobrará el valor del
                  tiempo aplicado a la elaboración de dicho presupuesto
                </Text>
                <Text>
                  * Se prevee un plazo de 90 días desde la fecha de admisión de la máquina para ser
                  retirada, de lo contrario se entenderá abandonada autorizando su desguace
                </Text>
              </View>
            </View>
            <View style={styles.emptyColumn}>
              <Text style={styles.label}>MATERIALES EMPLEADOS</Text>
              <Text>MANO DE OBRA ____________________ HORAS</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default PDFDocument;
