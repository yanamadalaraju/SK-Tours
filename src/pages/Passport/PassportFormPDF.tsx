import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts if needed
Font.register({
    family: 'Helvetica',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxP.ttf' }
    ]
});

const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#0c2b66',
        textDecoration: 'underline'
    },
    section: {
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        overflow: 'hidden'
    },
    sectionHeader: {
        backgroundColor: '#0c2b66',
        padding: 8,
        fontSize: 12,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        padding: 6
    },
    label: {
        width: '35%',
        fontSize: 9,
        fontWeight: 'bold',
        color: '#333333'
    },
    value: {
        width: '65%',
        fontSize: 9,
        color: '#555555'
    },
    subHeader: {
        backgroundColor: '#f0f0f0',
        padding: 6,
        fontSize: 10,
        fontWeight: 'bold',
        color: '#0c2b66'
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        fontSize: 8,
        color: '#999999'
    }
});

interface PassportFormPDFProps {
    formData: any;
}

const PassportFormPDF: React.FC<PassportFormPDFProps> = ({ formData }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>Passport Application Form</Text>
                
                {/* Basic Information Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Basic Information</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Applicant For:</Text>
                        <Text style={styles.value}>{formData.applicant_for || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Application Type:</Text>
                        <Text style={styles.value}>{formData.application_type || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Passport Booklet Type:</Text>
                        <Text style={styles.value}>{formData.passport_booklet || '-'} Pages</Text>
                    </View>
                </View>

                {/* Personal Details Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Personal Details</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.value}>{formData.name || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Middle Name:</Text>
                        <Text style={styles.value}>{formData.middle_name || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Surname:</Text>
                        <Text style={styles.value}>{formData.surname || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Date of Birth:</Text>
                        <Text style={styles.value}>{formData.dob || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Place of Birth:</Text>
                        <Text style={styles.value}>{formData.place_of_birth || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Cell No:</Text>
                        <Text style={styles.value}>{formData.cell_no || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Email:</Text>
                        <Text style={styles.value}>{formData.email || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>PAN Card No:</Text>
                        <Text style={styles.value}>{formData.pan_no || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Aadhar Card No:</Text>
                        <Text style={styles.value}>{formData.aadhaar_no || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Qualification:</Text>
                        <Text style={styles.value}>{formData.qualification || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Profession:</Text>
                        <Text style={styles.value}>{formData.profession || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Government Employee:</Text>
                        <Text style={styles.value}>{formData.govt_employee || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Visible Mark:</Text>
                        <Text style={styles.value}>{formData.visible_mark || '-'}</Text>
                    </View>
                </View>

                {/* Address Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Address</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Address:</Text>
                        <Text style={styles.value}>{formData.address || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>City:</Text>
                        <Text style={styles.value}>{formData.city || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Pincode:</Text>
                        <Text style={styles.value}>{formData.pincode || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>State:</Text>
                        <Text style={styles.value}>{formData.state || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Country:</Text>
                        <Text style={styles.value}>{formData.country || '-'}</Text>
                    </View>
                </View>

                {/* Parent Details Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Parent Details</Text>
                    <Text style={styles.subHeader}>Father's Details</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Father's Name:</Text>
                        <Text style={styles.value}>{formData.father_name || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Father's Middle Name:</Text>
                        <Text style={styles.value}>{formData.father_middle || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Father's Surname:</Text>
                        <Text style={styles.value}>{formData.father_surname || '-'}</Text>
                    </View>
                    
                    <Text style={styles.subHeader}>Mother's Details</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Mother's Name:</Text>
                        <Text style={styles.value}>{formData.mother_name || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Mother's Middle Name:</Text>
                        <Text style={styles.value}>{formData.mother_middle || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Mother's Surname:</Text>
                        <Text style={styles.value}>{formData.mother_surname || '-'}</Text>
                    </View>
                    
                    {formData.spouse_name && (
                        <>
                            <Text style={styles.subHeader}>Spouse Details</Text>
                            <View style={styles.row}>
                                <Text style={styles.label}>Spouse's Name:</Text>
                                <Text style={styles.value}>{formData.spouse_name || '-'}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Spouse's Middle Name:</Text>
                                <Text style={styles.value}>{formData.spouse_middle || '-'}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Spouse's Surname:</Text>
                                <Text style={styles.value}>{formData.spouse_surname || '-'}</Text>
                            </View>
                        </>
                    )}
                    
                    {formData.guardian_name && (
                        <>
                            <Text style={styles.subHeader}>Legal Guardian Details</Text>
                            <View style={styles.row}>
                                <Text style={styles.label}>Guardian's Name:</Text>
                                <Text style={styles.value}>{formData.guardian_name || '-'}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Guardian's Middle Name:</Text>
                                <Text style={styles.value}>{formData.guardian_middle || '-'}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Guardian's Surname:</Text>
                                <Text style={styles.value}>{formData.guardian_surname || '-'}</Text>
                            </View>
                        </>
                    )}
                </View>

                {/* Emergency Contact Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Emergency Contact</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Emergency Name:</Text>
                        <Text style={styles.value}>{formData.emergency_name || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Emergency Cell:</Text>
                        <Text style={styles.value}>{formData.emergency_cell || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Emergency Email:</Text>
                        <Text style={styles.value}>{formData.emergency_email || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Emergency Address:</Text>
                        <Text style={styles.value}>{formData.emergency_address || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Emergency City:</Text>
                        <Text style={styles.value}>{formData.emergency_city || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Emergency Pincode:</Text>
                        <Text style={styles.value}>{formData.emergency_pincode || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Emergency State:</Text>
                        <Text style={styles.value}>{formData.emergency_state || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Emergency Country:</Text>
                        <Text style={styles.value}>{formData.emergency_country || '-'}</Text>
                    </View>
                </View>

                {/* Additional Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Additional Information</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Criminal Case:</Text>
                        <Text style={styles.value}>{formData.criminal_case || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Post Office:</Text>
                        <Text style={styles.value}>{formData.post_office || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Police Station:</Text>
                        <Text style={styles.value}>{formData.police_station || '-'}</Text>
                    </View>
                </View>

                <Text style={styles.footer}>
                    Generated on {new Date().toLocaleString()} | Passport Application Form
                </Text>
            </Page>
        </Document>
    );
};

export default PassportFormPDF;