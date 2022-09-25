import React from 'react';
import {StyleSheet, View, StatusBar, Text, SafeAreaView, ScrollView} from 'react-native';
import {Header, Gap} from '../../../components';
import {colors, fonts} from '../../../utils';
import {useSelector} from 'react-redux';

const Kebijakan = ({navigation}) => {
  const en = useSelector((state) => state.language.english);
  return (
    <>
      <StatusBar barStyle="dark-content" translucent={true} />
      <Header
          label={en === true ? 'Privacy Policy' : 'Kebijakan Privasi'}
          type="shadow"
          onPress={() => navigation.goBack()}
      />
      <SafeAreaView style={styles.page}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>
                {en === true
                    ? 'Terms & Privacy Policy'
                    : 'Ketentuan & Kebijakan Privasi'}
              </Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.txt}>
                {en ? 'This Privacy Policy is made to protect and maintain the privacy and confidentiality of the Service Users. Users are expected to read this Privacy Policy (along with the Terms of Service) carefully before using Our Services.' : 'Kebijakan Privasi ini telah dibuat untuk melindungi dan menjaga privasi dan kerahasiaan dari Pengguna Layanan. Pengguna diharapkan membaca Kebijakan Privasi ini (beserta Ketentuan Layanan) dengan seksama sebelum menggunakan Layanan Kami.'}
              </Text>
              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? 'Depending upon Your relationship with Us, You may receive other privacy notices from Us providing additional detail about Our privacy practices. By accessing and using Our Services, Users acknowledge that they have read, understood and agreed to the content written in this Privacy Policy. If You do not agree to this Privacy Policy, please do not use the Service.' : 'Tergantung sifat hubungan Anda dengan Kami, Anda akan menerima pemberitahuan-pemberitahuan privasi lainnya terkait rincian dari praktik-praktik privasi Kami. Dengan mengakses dan menggunakan Layanan Kami, Pengguna mengakui telah membaca, memahami dan menyetujui setiap ketentuan yang tertulis dalam Kebijakan Privasi ini. Apabila Anda tidak menyetujui Kebijakan Privasi ini, mohon agar tidak menggunakan Layanan Kami.'}
              </Text>
              <Gap height={10} />
              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'ARTICLE 1'
                      : 'PASAL 1'}
                </Text>
              </View>

              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'DEFINITION'
                      : 'DEFINISI'}
                </Text>
              </View>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? 'Other than stipulated in this Privacy Policy, the following definitions shall have the definition, meanings and interpretation as stipulated below:' : 'Selain yang telah ditentukan pada bagian lain dalam Kebijakan Privasi ini, istilah-istilah berikut akan memiliki definisi, pengertian, dan penafsiran sebagaimana ditentukan di bawah ini:'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '"You" or "Your" (as the context may require) means the User who uses Our Services.' : '"Anda" berarti merujuk pada Pengguna yang menggunakan Layanan Kami.'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '"Personal Information" means all data, statements, information and documents, both in electronic and non-electronic form that may identify an individual, received or accessed by Us from the User, which have obtained such User’s consent, to be stored and managed by Us in connection with the provision of Services and for the purpose of utilization of Services by User.' : '"Informasi Pribadi" berarti meliputi segala data, keterangan, informasi dan dokumen, baik elektronik maupun non-elektronik yang dapat mengidentifikasi seseorang, yang Kami terima atau akses dari Pengguna, diajukan, diberikan atau diungkapkan oleh Pengguna kepada Kami, yang telah mendapatkan persetujuan Pengguna tersebut, serta disimpan dan dikelola oleh Kami sehubungan dengan penyediaan Layanan dan dalam rangka pemanfaatan Layanan oleh Pengguna.'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '"We" or "Us" or "Our" (as the context may require) means PT Mitra Jaya Arya Sanika, a limited liability company established under the laws of the Republic of Indonesia, which is engaged in the field of transportation services.' : '"Kami" berarti PT Mitra Jaya Arya Sanika, suatu perseroan terbatas yang didirikan berdasarkan hukum negara Republik Indonesia, yang bergerak di bidang pelayanan tranportasi.'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '"Services" means services which is owned, administered and provided by Us.' : '"Layanan" berarti layanan yang dimiliki, dikelola dan disediakan oleh Kami.'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '"User" or "Users" (as the context may require) means any party that uses or access Our Services.' : '"Pengguna" berarti setiap pihak yang menggunakan atau mengakses Layanan Kami.'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '"PP No. 71/2019" means the Government Regulation No. 71 of 2019 concerning System Implementation and Electronic Transaction along with all implementing regulations, changes, amendments, modifications and/or additions made from time to time.' : '"PP No. 71/2019" adalah Peraturan Pemerintah No. 71 Tahun 2019 tentang Penyelenggaraan Sistem dan Transaksi Elektronik beserta segala peraturan pelaksana, perubahan, amandemen, modifikasi dan/atau penambahan yang dibuat dari waktu ke waktu.'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '"Perkominfo No. 20/2016" means the Minister of Communication and Informatics Regulation Number 20 of 2016 concerning Protection of Personal Information in Electronic Systems along with all implementing regulations, changes, amendments, modifications and/or additions made from time to time.' : '"Perkominfo No. 20/2016" berarti Peraturan Menteri Komunikasi dan Informatika Nomor 20 Tahun 2016 tentang Perlindungan Informasi Pribadi dalam Sistem Elektronik beserta segala peraturan pelaksana, perubahan, amandemen, modifikasi dan/atau penambahan yang dibuat dari waktu ke waktu.'}
              </Text>

              <Gap height={10} />
              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'ARTICLE 2'
                      : 'PASAL 2'}
                </Text>
              </View>

              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'RECITALS'
                      : 'PENDAHULUAN'}
                </Text>
              </View>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '2.1 By using Our Service and/or providing Personal Information to Us, You agree, represent and warrant to the collection, use and disclosure of Personal Information in accordance with this Privacy Policy.' : 'Dengan menggunakan Layanan Kami dan/atau memberikan Informasi Pribadi kepada Kami, Anda setuju atas pengumpulan, pemrosesan dan pengungkapan Informasi Pribadi sesuai dengan Kebijakan Privasi ini.'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '2.2 Your electronic consent, representation and warranty as referred to in Article 2.1 above shall:' : '2.2 Persetujuan, pernyataan dan jaminan Anda secara elektronik sebagaimana dimaksud dalam Pasal 2.1 di atas adalah:'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(a) be sufficient consent for the purposes of Article 1320 of the Civil Code as a condition for the validity of an agreement as well as any formality of consent as set out under PP No. 71/2019 and Perkominfo 20/2016; ' : '(a) dianggap cukup untuk menunjukan persetujuan sebagaimana dimaksud dalam Pasal 1320 Kitab Undang-Undang Hukum Perdata ("KUHPer") sebagai syarat sahnya suatu perjanjian serta setiap formalitas persetujuan sebagaimana diatur di dalam PP No. 71/2019 dan Perkominfo 20/2016;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(b) qualify as valid legal evidence based on Article 5 paragraph 1 of the ITE Law; and' : '(b) dikualifikasikan sebagai alat bukti hukum yang sah berdasarkan Pasal 5 ayat 1 UU ITE; dan'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(c) constitute an instrument of proof received as part of the concept of civil evidentiary proof in court according to Article 1865 Civil Code.' : '(c) merupakan instrumen pembuktian yang diterima sebagai bagian dari konsep pembuktian secara perdata dalam pengadilan menurut Pasal 1865 KUHPer.'}
              </Text>

              <Gap height={10} />
              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'ARTICLE 3'
                      : 'PASAL 3'}
                </Text>
              </View>

              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'PERSONAL INFORMATION'
                      : 'INFORMASI PRIBADI'}
                </Text>
              </View>

              <Gap height={10} />
              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'PERSONAL INFORMATION USAGE'
                      : 'PENGGUNAAN INFORMASI PRIBADI'}
                </Text>
              </View>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '3.1 In order for You to use Our Service and for Us to provide the Services, We may request, obtain, collect, store, manage and use Personal Information that You own, which is required for the utilization of Our Service and other information obtained through the use of Our Service.' : '3.1 Agar Anda dapat menggunakan Layanan Kami dan agar Kami dapat menyediakan Layanan, Kami dapat meminta, memperoleh, mengumpulkan, menyimpan, mengelola dan menggunakan Informasi Pribadi yang Anda miliki, yang diperlukan untuk diungkapkan dalam rangka penggunaan Layanan Kami serta informasi lainnya yang diperoleh melalui penggunaan Layanan Kami.'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? 'You hereby consent to Us collecting, obtaining, storing, using and disclosing Personal Information, behavioral data, site history, or any other information on the use of services, that You own, and to disclose to appropriate third parties in or outside of the Republic of Indonesia, including service providers and Our group of companies, including but not limited for the following purposes:' : '3.2 Anda dengan ini memberikan persetujuan kepada Kami untuk mengambil, memperoleh, mengumpulkan, mengolah, menyimpan, menggunakan dan mengungkapkan Informasi Pribadi, data perilaku, histori situs, maupun segala informasi penggunaan layanan yang Anda miliki, dan untuk mengungkapkan kepada pihak ketiga yang layak baik di dalam maupun di luar wilayah Republik Indonesia, termasuk para penyedia jasa dan perusahaan lain dalam grup usaha Kami, termasuk namun tidak terbatas pada tujuan-tujuan sebagai berikut:'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(a) to present Our websites, products and services to you and and to improve the quality of Our websites, products and services;' : '(a) untuk menyajikan situs, web, produk, dan layanan Kami kepada Anda serta meningkatkan kualitas situs, web, produk, dan layanan Kami;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(b) manage Our relationship with You which may include providing information to You regarding Our Service and allowing You to use Our Services, such as for the following matters:' : '(b) mengelola hubungan Kami dengan Anda yang dapat termasuk menyediakan informasi kepada Anda tentang Layanan Kami dan memungkinkan Anda untuk menggunakan Layanan Kami, seperti untuk hal-hal berikut:'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(c) sending notifications via e-mail to You;' : '(c) mengirim notifikasi melalui surat elektronik (e-mail) kepada Anda;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(d) contacting You regarding Your request;' : '(d) menghubungi Anda terkait dengan permintaan Anda;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(e) for Our business needs in general, including verifying your identity and credit reputation (if relevant);' : '(e) untuk keperluan bisnis Kami secara umum termasuk untuk memverifikasi identitas Anda dan reputasi kredit Anda (apabila relevan);'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(f) provide, manage, develop and offer You various products and services.' : '(f) menyediakan, mengelola, mengembangkan dan menawarkan berbagai produk dan jasa kepada Anda.'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(g) identifying You when You contact Us or using the Service;' : '(g) mengidentifikasi Anda ketika Anda menghubungi Kami atau menggunakan Layanan;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(h) providing adequate information stored by Us to identify You to third parties;' : '(h) memberikan informasi yang memadai yang disimpan oleh Kami untuk mengidentifikasi Anda kepada pihak ketiga;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(i) allowing You to participate in Our interactive feature Services;' : '(i) mengizinkan Anda berpartisipasi dalam Layanan fitur interaktif Kami;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(j) handling questions or complaints made by or related to You in connection with the Service and stored to prevent and detect any fraud, infringement and other potential misuse from occuring;' : '(j) menangani pertanyaan atau keluhan yang dibuat oleh atau tentang Anda sehubungan dengan Layanan dan disimpan untuk mencegah dan mendeteksi kecurangan, pelanggaran dan bentuk penyalahgunaan lainnya;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(k) verifying Your compliance with the terms and conditions governing the use of the Service;' : '(k) memverifikasi kepatuhan Anda terhadap persyaratan dan ketentuan yang mengatur penggunaan Layanan;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(l) conducting surveys, research, evaluations, academic study and/or product or services development, either by Us or other third parties;' : '(l) mengadakan atau melakukan survei, riset, evaluasi, studi akademik dan/atau pengembangan produk atau layanan, baik oleh Kami atau pihak ketiga;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(m) conducting investigations under any prevailing laws;' : '(m) melakukan setiap investigasi berdasarkan hukum yang berlaku;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(n) fulfilling any legal, regulatory and compliance requirements that apply to Us and Services based on the prevailing laws and compliance with applicable agreements relating to the implementation of the Services;' : '(n) memenuhi persyaratan hukum, regulasi dan kepatuhan yang berlaku terhadap Kami beserta Layanan berdasarkan undang-undang yang berlaku dan mematuhi setiap perjanjian yang berlaku sehubungan dengan pelaksanaan Layanan;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(o) implementing the instructions or policies of the government, regulatory bodies or authorized agencies; and' : '(o) melaksanakan perintah atau kebijakan pemerintah, badan pengaturan atau instansi yang berwenang; dan'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(p) notifying You regarding any changes to the Services.' : '(p) memberitahu Anda tentang perubahan-perubahan terhadap Layanan.'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(q) To provide access to, share and transfer such Personal Information behavioral data, site history, or any other information on the use of services, to third parties, including Our affiliated party(ies), any service providers, and professional advisors, which are also bound by this Privacy Policy, for the purpose of marketing, research and development of Our Services.' : '(q) Untuk memberikan akses, membagi dan menyerahkan Informasi Pribadi, data perilaku, histori situs, maupun segala informasi penggunaan layanan tersebut kepada pihak ketiga, termasuk namun tidak terbatas pada, pihak(-pihak) yang terafiliasi dengan Kami, penyelenggara layanan, dan penasihat profesional yang juga tunduk pada Kebijakan Privasi ini, untuk tujuan pemasaran, penelitian dan pengembangan Layanan Kami.'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '3.3 The Personal Information submitted by You to Us will be used for the purposes in accordance with the consent that You have given to Us in this Privacy Policy.' : '3.3 Informasi Pribadi yang disampaikan oleh Anda kepada Kami akan digunakan untuk tujuan tersebut sesuai dengan persetujuan yang telah Anda berikan kepada Kami berdasarkan Kebijakan Privasi ini.'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '3.4 We can disclose Personal Information which is provided to us in connection with the use of Our Service without obtaining your express consent, where:' : '3.4 Kami dapat mengungkapkan Informasi Pribadi yang Anda berikan kepada Kami dalam rangka penggunaan Layanan Kami tanpa persetujuan tertulis dari Anda, apabila:'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(a) it is required by laws and regulations;' : '(a) dipersyaratkan oleh peraturan perundang-undangan;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(b) there is an ongoing or future legal proceeding taking place;' : '(b) terdapat proses hukum yang sedang atau akan berlangsung;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(c) there is any actual or suspended breach of the prevailing laws;' : '(c) terdapat pelanggaran atau dugaan pelanggaran hukum yang berlaku;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(d) it is required by the authorized government agencies;' : '(d) dipersyaratkan oleh instansi pemerintah yang berwenang;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(e) required by permitted third parties, including academic institutions for analytics and research purposes, or' : '(e) diperlukan oleh pihak-pihak ketiga yang diizinkan, termasuk institusi akademik untuk tujuan analisis dan riset; atau'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(f) we have already obtained written approval in accordance with this Privacy Policy or otherwise.' : '(f) telah mendapatkan persetujuan tertulis sesuai dengan Kebijakan Privasi ini atau lainnya;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '3.5 If You provide Us with false and inaccurate information, or We suspect that there is any fraud, We may record this matter in Your history of use of Our Services and share that information with the appropriate legal entity or authorities and/or fraud prevention agencies.' : '3.5 Jika Anda memberikan Kami informasi yang salah dan tidak akurat, atau Kami menduga adanya penipuan, Kami dapat mencatat hal tersebut dalam sejarah penggunaan Layanan Kami oleh Anda dan membagikan informasi tersebut ke badan hukum yang tepat atau pihak yang berwenang dan/atau instansi pencegah penipuan.'}
              </Text>

              <Gap height={10} />
              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'PERSONAL INFORMATION STORAGE'
                      : 'PENYIMPANAN INFORMASI PRIBADI'}
                </Text>
              </View>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '3.6 All Personal Information that You provide and/or that We receive in accordance with this Privacy Policy is stored within the territory of the Republic of Indonesia and if transferred outside the territory of the Republic of Indonesia, such transfer will be made in accordance with requirements set out under the prevailing laws and regulations.' : '3.6 Semua Informasi Pribadi yang Anda berikan dan/atau Kami terima sesuai dengan Kebijakan Privasi ini disimpan dengan aman di wilayah Republik Indonesia dan apabila Informasi Pribadi tersebut dikirim ke luar wilayah Republik Indonesia, pengiriman tersebut akan dilakukan sesuai dengan syarat dan ketentuan peraturan perundang-undangan yang berlaku.'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '3.7 We will store Personal Information as provided by You for at least 5 (five) years or as long as it is necessary to protect Our interests or as required by laws and regulations.' : '3.7 Kami akan menyimpan Informasi Pribadi yang Anda berikan setidaknya selama 5 (lima) tahun atau selama diperlukan untuk melindungi kepentingan Kami atau sebagaimana dipersyaratkan oleh peraturan perundang-undangan.'}
              </Text>

              <Gap height={10} />
              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'SECURITY OF PERSONAL INFORMATION'
                      : 'KEAMANAN INFORMASI PRIBADI'}
                </Text>
              </View>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '3.8 We will take all reasonable steps and actions to prevent the loss, misuse or unauthorized changes of Personal Information by unauthorized parties.' : '3.8 Kami akan mengambil semua langkah dan tindakan yang wajar untuk mencegah kehilangan, penyalahgunaaan atau perubahan Informasi Pribadi tanpa izin oleh pihak-pihak yang tidak berwenang.'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '3.9 Regardless of the steps and precautionary actions that We take, unauthorized entry or use, and hardware or software failure, may happen and compromise the security of Personal Information. We hereby disclaim, to the fullest extent permissible by law, any responsibility or liability directly or indirectly arising out of or in connection with, any loss, theft, or unauthorized access, collection, use, disclosure, copying, modification, disposal or similar actions with regard to any Personal Information provided by You to Us.' : '3.9 Terlepas dari langkah dan tindakan pencegahan yang Kami lakukan, pemasukan atau penggunaan tanpa izin, serta kegagalan perangkat keras atau lunak, dapat terjadi dan mengganggu keamanan dari Informasi Pribadi. Sehubungan dengan hal-hal tersebut Kami dengan ini memberikan disclaimer bahwa, sepanjang sepenuhnya diperbolehkan oleh hukum, setiap tanggung jawab atau tanggungan langsung maupun tidak langsung yang timbul dari atau sehubungan dengan setiap kerugian, pencurian, atau pengaksesan tanpa izin, pengambilan, penggunaan, pengungkapan, penyalinan, modifikasi, penghilangan atau tindakan serupa berkenaan dengan Informasi Pribadi yang diberikan oleh Anda kepada Kami.'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '3.10 When registering yourself for our Services, You are requested to create Your own personal password. You are responsible for maintaining the confidentiality of this password. You should not share Your password with anyone.' : '3.10 Saat mendaftarkan diri untuk Layanan Kami, Anda diminta untuk membuat kata sandi pribadi Anda sendiri. Anda bertanggung jawab untuk menjaga kerahasiaan kata sandi tersebut. Anda diminta untuk tidak membagikan kata sandi Anda kepada pihak manapun.'}
              </Text>

              <Gap height={10} />
              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'RETURNING AND DESTRUCTION OF PERSONAL INFORMATION'
                      : 'PENGEMBALIAN DAN PEMUSNAHAN INFORMASI PRIBADI'}
                </Text>
              </View>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '3.11 When registering yourself for our Services, You are requested to create Your own personal password. You are responsible for maintaining the confidentiality of this password. You should not share Your password with anyone.' : '3.11 Saat mendaftarkan diri untuk Layanan Kami, Anda diminta untuk membuat kata sandi pribadi Anda sendiri. Anda bertanggung jawab untuk menjaga kerahasiaan kata sandi tersebut. Anda diminta untuk tidak membagikan kata sandi Anda kepada pihak manapun.'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(a) Personal Information has been stored for 5 (five) years or is required to be destroyed in accordance with the prevailing laws; or' : '(a) Informasi Pribadi telah disimpan selama 5 (lima) tahun atau sesuai dengan ketentuan peraturan perundang-undangan perlu dihapus; atau'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(b) Based on Your request, unless We are required to retain such Personal Information in accordance with the prevailing laws and regulations. You hereby acknowledge that You understand that as a result of terminating Your consent, including but not limited to Your inability to use Our Service.' : '(b) atas permintaan Anda, kecuali Kami dipersyaratkan untuk menyimpannya sesuai dengan ketentuan peraturan perundang-undangan. Anda dengan ini menyatakan bahwa Anda memahami konsekuensi dari penarikan persetujuan Anda, termasuk namun tidak terbatas pada tidak lagi dapat menikmati Layanan.'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '3.12 Destruction of Personal Information as referred to in Article 3.11 includes removing part or all of the documents related to the Personal Information that We hold so that the Personal Information cannot be re-displayed in Our electronic system unless You provide new Personal Information to Us.' : '3.12 Pemusnahan Informasi Pribadi sebagaimana pada Pasal 3.11 termasuk menghilangkan sebagian atau keseluruhan dokumen terkait Informasi Pribadi yang Kami simpan sehingga Informasi Pribadi tersebut tidak dapat ditampilkan kembali dalam sistem elektronik Kami kecuali Anda memberikan Informasi Pribadi yang baru kepada Kami.'}
              </Text>

              <Gap height={10} />
              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'THE CHANGE OF PERSONAL INFORMATION'
                      : 'PERUBAHAN INFORMASI PRIBADI'}
                </Text>
              </View>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '3.13 We understand the possibility of updates or amendments in the Personal Information that You own is required in connection with the use of Our Service from time to time. such update or amendment is needed, You can submit a written request via e-mail to Us and provide Us with the relevant details. We will help to update and/correct such Personal Information for You if it is deemed necessary.' : '3.13 Kami memahami adanya kemungkinan pembaruan atau perubahan Informasi Pribadi yang Anda miliki, yang diperlukan dalam rangka penggunaan Layanan Kami dari waktu ke waktu. Jika pembaruan atau perubahan tersebut diperlukan, maka Anda dapat mengajukan permohonan secara tertulis via surat elektronik (e-mail) kepada Kami dan berikan Kami rincian yang relevan. Kami akan membantu memperbarui dan/atau memperbaiki Informasi Pribadi tersebut untuk Anda jika dianggap perubahan tersebut diperlukan.'}
              </Text>

              <Gap height={10} />
              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'RETURN AND REMOVAL OF PERSONAL INFORMATION'
                      : 'PENGEMBALIAN DAN PENGHAPUSAN INFORMASI PRIBADI'}
                </Text>
              </View>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '3.14 You are entitled to request the return of the Personal Information provided that You have no obligation, financial responsibility, debt or similar matters in conncection with the use of Our Services.' : '3.14 Anda berhak atas pengembalian Informasi Pribadi dengan persyaratan bahwa Anda tidak memiliki kewajiban, tanggung jawab finansial, utang atau hal sejenisnya sehubungan dengan penggunaan Layanan Kami.'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '3.15 The request for the return of Personal Information shall be sent to Us via e-mail and attach Your valid proof of identity (copy of resident card or passport) along with the reasons for requiring the return of such Personal Information.' : '3.15 Permohonan pengembalian Informasi Pribadi tersebut disampaikan kepada Kami melalui surat elektronik (e-mail) dengan menyertakan bukti diri yang sah (salinan kartu tanda penduduk atau paspor) beserta alasan perlunya pengembalian Informasi Pribadi.'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '3.16 You have the right to request the deletion of Personal Information that You own in connection with the use of Our Service that We hold by giving at least 10 (ten) working days written notice before the proposed date of deletion by stating the type or form of Personal Information requested for deletion. Provisions for the elimination of this Personal Information must be carried out in accordance with the provisions of Perkominfo No. 20/2016.' : '3.16 Anda berhak memohonkan penghapusan Informasi Pribadi yang Anda miliki yang diperlukan dalam rangka penggunaan Layanan Kami yang Kami simpan dengan memberikan pemberitahuan secara tertulis paling lambat 10 (sepuluh) hari kerja sebelum tanggal penghapusan yang dikehendaki dengan menyebutkan jenis atau wujud Informasi Pribadi yang dimohonkan penghapusannya. Ketentuan penghapusan Informasi Pribadi ini harus dilaksanakan sesuai dengan ketentuan Perkominfo No. 20/2016.'}
              </Text>

              <Gap height={10} />
              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'ARTICLE 4'
                      : 'PASAL 4'}
                </Text>
              </View>

              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'USERS RIGHTS'
                      : 'HAK PENGGUNA'}
                </Text>
              </View>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? 'In connection with the use of Our Services, the User is entitled:' : 'Sehubungan dengan penggunaan Layanan Kami, Pengguna berhak:'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(a) to the confidentiality of Your Personal Information;' : '(a) atas kerahasiaan Informasi Pribadinya;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(b) to submit a complaint in the context of Our failure to protect the Personal Information to the relevant authorized agencies in accordance with the prevailing laws and regulations;' : '(b) mengajukan pengaduan dalam rangka kegagalan Kami dalam melakukan perlindungan Informasi Pribadi kepada pihak yang berwenang sesuai dengan peraturan perundang-undangan yang berlaku;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(c) to obtain access to, change or update Your Personal Information, unless otherwise specified in the laws and regulations;' : '(c) mendapatkan akses untuk mengubah atau memperbaharui Informasi Pribadinya, kecuali ditentukan lain oleh ketentuan peraturan perundang-undangan;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(d) to obtain access to Your historical Personal Information that has been submitted to Us in accordance with the prevailing laws and regulations;' : '(d) mendapatkan akses atau untuk memperoleh historis Informasi Pribadinya yang pernah diserahkan kepada Kami sepanjang masih sesuai dengan ketentuan peraturan perundang-undangan yang berlaku;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(e) to request the destruction of Personal Information that We manage, unless specified otherwise in the prevailing laws and regulations; and' : '(e) meminta pemusnahan Informasi Pribadi yang yang Kami kelola, kecuali ditentukan lain oleh ketentuan peraturan perundang-undangan yang berlaku; dan'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(f) to determine if the Personal Information is confidential or non-confidential (if required).' : '(f) menentukan apakah suatu Informasi Pribadi bersifat rahasia atau tidak (apabila dibutuhkan):'}
              </Text>

              <Gap height={10} />
              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'ARTICLE 5'
                      : 'PASAL 5'}
                </Text>
              </View>

              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'FAILURE IN PROTECTING PERSONAL INFORMATION'
                      : 'KEGAGALAN MENJAGA INFORMASI PRIBADI'}
                </Text>
              </View>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? 'You agree not to seek Our responsibility for violations, or non-compliance with the Privacy Policy or the protection of Personal Information in the following situations:' : 'Anda setuju untuk tidak meminta pertanggungjawaban Kami atas pelanggaran, atau ketidakpatuhan terhadap Kebijakan Privasi atau perlindungan Informasi Pribadi dalam situasi berikut:'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(a) Where an act of nature or an unexpected situation has occurred, resulting in damage or destruction of equipment and/or systems which are used to secure, store or process a User\'s Personal Information;' : '(a) Dimana suatu tindakan alam atau keadaan yang tidak terduga telah terjadi, mengakibatkan kerusakan atau penghancuran peralatan dan/atau sistem yang digunakan untuk mengamankan, menyimpan atau memproses Informasi Pribadi Pengguna;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(b) Where Personal Information is available or can be found by the public before such Personal Information has been conveyed by Us;' : '(b) Dimana Informasi Pribadi telah tersedia atau dapat ditemukan oleh publik sebelum Informasi Pribadi tersebut disampaikan kepada Kami;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(c) Where We have given our best effort and to verify, secure and protect the Personal Information, and in the event of any unauthorized access, hacking, misuse, modification, change, interference;' : '(c) Dimana Kami telah memberikan upaya terbaik untuk memverifikasi, mengamankan dan melindungi Informasi Pribadi, dan dalam hal terdapat akses yang tidak sah, hacking, penyalahgunaan, modifikasi, perubahan, gangguan;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(d) For the accuracy (unless for Personal Information that has been verified by Us at our discretion), validity, legality and completeness of Your Personal Information; and/or' : '(d) Atas keakurasian (kecuali Informasi Pribadi yang telah diverifikasi oleh Kami sesuai kebijaksanaan Kami), keabsahan, legalitas dan kelengkapan Informasi Pribadi Anda; dan/atau'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(e) Where the misuse of Personal Information and information caused by acts of crime, fraud or any criminal act or illegal action of a third party that is not under Our control or instruction.' : '(e) Dimana penyalahgunaan Informasi Pribadi dan informasi yang disebabkan dengan tindakan kejahatan, penipuan atau tindak pidana apapun atau salah tindakan dari pihak ketiga yang tidak berada di bawah kendali atau instruksi Kami.'}
              </Text>

              <Gap height={10} />
              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'ARTICLE 6'
                      : 'PASAL 6'}
                </Text>
              </View>

              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'COOKIES'
                      : 'COOKIES'}
                </Text>
              </View>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '6.1 By using Our Services, You realize that cookies or similar technologies can be installed on Your device. Cookies are files that record information such as site search traces from a device or to collect internet log information and visitor behavior information, including but not limited to transaction, financial, or expenditure history. When You re-use Our Services, cookies will make it easier for Us to customize the content to suit Your needs. With this, You hereby agree that We may collect and store such informations obtained by the use of the cookies and may utilize it for the purposes as set out in Article 3.2 of this Privacy Policy.' : '6.1 Dengan menggunakan Layanan Kami, Anda mengetahui bahwa cookies atau teknologi serupa dapat terpasang di perangkat Anda. Cookies adalah file yang mencatat informasi seperti jejak pencarian situs dari perangkat atau untuk mengumpulkan informasi log internet dan informasi perilaku pengunjung, termasuk namun tidak terbatas pada histori transaksi, finansial, maupun pembelanjaan. Saat Anda menggunakan Layanan kami kembali, cookies akan memudahkan Kami untuk menyesuaikan konten sesuai dengan kebutuhan Anda. Dengan ini Anda setuju bahwa Kami akan mengumpulkan dan mencatat segala informasi yang didapatkan dari cookies dan dapat menggunakannya dengan tujuan sebagaimana diatur dalam Pasal 3.2 Kebijakan Privasi ini.'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '6.2 Even though Your device will automatically accept cookies, You can choose to make modifications through Your search site settings by choosing to reject cookies and deleting cookies installed on Your device at any time by configuring Your search site software. You may not obtain the benefit of the Services if the cookies are deleted or prevented from being installed in Your device.' : '6.2 Walaupun secara otomatis perangkat Anda akan menerima cookies, Anda dapat menentukan pilihan untuk melakukan modifikasi melalui pengaturan situs pencarian Anda yaitu dengan memilih untuk menolak cookies dengan menghapus cookies yang terpasang di perangkat Anda setiap saat dengan mengkonfigurasi perangkat lunak situs pencarian Anda. Anda mungkin tidak mendapatkan keuntungan dari Layanan jika cookies dihapus atau dicegah agar tidak terpasang diperangkat Anda.'}
              </Text>

              <Gap height={10} />
              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'ARTICLE 7'
                      : 'PASAL 7'}
                </Text>
              </View>

              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'USER OTHER ACCOUNT ACCESS'
                      : 'AKSES AKUN LAIN PENGGUNA'}
                </Text>
              </View>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '7.1 In the framework of provision of Services, We may request You to allow Us to access Your other accounts including but not limited to Twitter, Facebook, Google+ and/or LinkedIn, or any of Your accounts in other platforms or applications. However, You are not required to give access to Your other account(s).' : '7.1 Dalam rangka penyediaan Layanan, Kami dapat meminta Anda untuk memberikan Kami izin mengakses ke akun lain Anda termasuk namun tidak terbatas pada Twitter, Facebook, Google+ dan/atau Linkedln, maupun akun Anda pada platform atau aplikasi lainnya. Namun, Anda tidak diwajibkan untuk memberikan akses ke akun lainnya milik Anda.'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '7.2 In the event that You give Us access to Your other account(s) data, You must understand that We only use that data for the following purposes:' : '7.2 Dalam hal Anda memberikan Kami akses ke data akun lainnya milik Anda, Anda harus memahami bahwa Kami hanya menggunakan data tersebut untuk tujuan berikut:'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(a) identity verification;' : '(a) verifikasi identitas;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(b) mitigating the risks of identity fraud;' : '(b) mitigasi risiko penipuan identitas;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(c) analytical / quantitative statistics;' : '(c) statistik analisis/kuantitatif;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(d) carrying out regulatory control;' : '(d) melakukan kontrol regulasi;'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(e) providing information and answering questions; and' : '(e) memberikan informasi dan menjawab pertanyaan; dan'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '(f) preventing fraud, money laundering and other criminal activities.' : '(f) mencegah penipuan, pencucian uang dan kegiatan kriminal lainnya.'}
              </Text>

              <Gap height={10} />
              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'ARTICLE 8'
                      : 'PASAL 8'}
                </Text>
              </View>

              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'CHANGES IN PRIVACY POLICY'
                      : 'PERUBAHAN KEBIJAKAN PRIVASI'}
                </Text>
              </View>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '8.1 This Privacy Policy may be changed and/or updated from time to time.' : '8.1 Kebijakan Privasi ini mungkin diubah dan/atau diperbaharui dari waktu ke waktu.'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '8.2 You are advised to read carefully and check this Privacy Policy from time to time so that you remain informed about the latest version of this Privacy Policy.' : '8.2 Anda disarankan untuk membaca secara saksama dan memeriksa Kebijakan Privasi ini dari waktu ke waktu agar Anda tetap terinformasikan mengenai perubahan terbaru dalam Kebijakan Privasi ini.'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '8.3 We may notify You of changes made to this Privacy Policy via e-mail to Your registered e-mail address.' : '8.3 Kami dapat memberitahu Anda tentang perubahan yang dibuat pada Kebijakan Privasi ini melalui surat elektronik (e-mail) ke alamat e-mail Anda yang terdaftar.'}
              </Text>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? '8.4 By continuing to use Our Services, You agree to any changes to this Privacy Policy.' : '8.4 Dengan tetap menggunakan Layanan Kami, maka Anda menyetujui perubahan-perubahan dalam Kebijakan Privasi ini.'}
              </Text>

              <Gap height={10} />
              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'ARTICLE 9'
                      : 'PASAL 9'}
                </Text>
              </View>

              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'MISCELLANEOUS'
                      : 'LAIN-LAIN'}
                </Text>
              </View>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? 'This Privacy Policy is in accordance with the prevailing laws and regulations, including but not limited to the ITE Law, PP No. 71/2019 and Perkominfo No. 20/2016.' : 'Kebijakan Privasi ini sesuai dengan peraturan perundang-undangan yang berlaku, termasuk namun tidak terbatas pada UU ITE, PP No. 71/2019 dan Perkominfo No. 20/2016.'}
              </Text>

              <Gap height={10} />
              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'ARTICLE 10'
                      : 'PASAL 10'}
                </Text>
              </View>

              <View style={styles.titleWrapper}>
                <Text style={styles.desc}>
                  {en
                      ? 'CONTACT'
                      : 'KONTAK'}
                </Text>
              </View>

              <Gap height={10} />
              <Text style={styles.txt}>
                {en ? 'If there are any questions, comments or requests regarding this Privacy Policy, please contact mysupir.haribima21@gmail.com' : 'Apabila ada pertanyaan, komentar dan permintaan mengenai Kebijakan Privasi ini, dapat ditujukan kepada alamat mysupir.haribima21@gmail.com'}
              </Text>

            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Kebijakan;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  titleWrapper: {
    // alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    paddingRight: 5,
  },
  txt: {
    fontSize: 12,
    textAlign: 'justify',
    lineHeight: 15,
    fontFamily: fonts.primary[400],
    color: '#222831',
  },
  content: {
    paddingTop: 20,
  },
  desc: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: fonts.primary[400],
    color: '#222831',
  },
});
