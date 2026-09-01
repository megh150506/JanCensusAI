export type SupportedLanguageCode = "en" | "hi" | "mr" | "ta" | "bn" | "te" | "gu" | "kn";

export interface TranslationsMap {
  // Navigation
  navDashboard: string;
  navPhases: string;
  navSchedule: string;
  navSelfEnum: string;
  navAiAssistant: string;
  navFactCheck: string;
  navPrivacy: string;
  navAnalytics: string;
  navCitizenPreview: string;
  navFactCheckMonitor: string;
  navLanguage: string;
  navActivePortal: string;
  navHelplineTitle: string;
  navHelplineSub: string;

  // Header
  headerWelcome: string;
  headerAskAi: string;
  headerNotices: string;
  headerMarkRead: string;
  headerMyProfile: string;
  headerSettings: string;
  headerLogout: string;
  headerAadhaarVerified: string;

  // Citizen Dashboard Hero & Actions
  heroBadge: string;
  heroTitle: string;
  heroDesc: string;
  heroStartSelfEnum: string;
  heroExploreAi: string;
  actionHubTitle: string;
  actionHubSub: string;
  accessFeature: string;

  // Quick Action Cards
  cardScheduleTitle: string;
  cardScheduleSub: string;
  cardPhasesTitle: string;
  cardPhasesSub: string;
  cardSelfEnumTitle: string;
  cardSelfEnumSub: string;
  cardAiTitle: string;
  cardAiSub: string;

  // Timeline Explorer
  timelineTitle: string;
  timelineSub: string;
  timelineStateLabel: string;
  phase1Title: string;
  phase1Sub: string;
  phase1SelfEnumWindow: string;
  phase1FieldWindow: string;
  phase1Action: string;
  phase2Title: string;
  phase2Sub: string;
  phase2PortalWindow: string;
  phase2FieldWindow: string;
  phase2Action: string;
  legalSafetyTitle: string;
  legalSafetyDesc: string;
  legalSafetyAction: string;

  // AI Chat Drawer
  aiAssistantTitle: string;
  aiAssistantSub: string;
  aiLegalRibbon: string;
  aiQuickTitle: string;
  aiPlaceholder: string;

  // Fact Check Page
  factCheckTitle: string;
  factCheckSub: string;
  factCheckInputLabel: string;
  factCheckPlaceholder: string;
  factCheckButton: string;
  factCheckVerifying: string;
  factCheckSampleTitle: string;
  verdictFact: string;
  verdictMisinfo: string;
  verdictPartial: string;

  // Self Enumeration Guide Page
  guideTitle: string;
  guideSub: string;
  step1Title: string;
  step2Title: string;
  step3Title: string;
  headNameLabel: string;
  mobileLabel: string;
  stateLabel: string;
  districtLabel: string;
  pincodeLabel: string;
  houseNumLabel: string;
  dwellingTypeLabel: string;
  waterSourceLabel: string;
  lightingLabel: string;
  latrineLabel: string;
  submitGenerateQr: string;
  receiptTitle: string;
  receiptSub: string;
  refIdLabel: string;
  printSlip: string;
  returnDashboard: string;

  // Admin Dashboard
  adminTitle: string;
  adminSub: string;
  campaignGenTitle: string;
  campaignGenSub: string;
  campaignTopicLabel: string;
  campaignRegionLabel: string;
  campaignAudienceLabel: string;
  campaignLangLabel: string;
  campaignGenerateButton: string;
}

export const translations: Record<string, TranslationsMap> = {
  en: {
    navDashboard: "Dashboard",
    navPhases: "Census Phases",
    navSchedule: "State Schedule",
    navSelfEnum: "Self-Enumeration",
    navAiAssistant: "AI Assistant",
    navFactCheck: "Fact Check",
    navPrivacy: "Privacy & Safety",
    navAnalytics: "Analytics Dashboard",
    navCitizenPreview: "Citizen Preview",
    navFactCheckMonitor: "Fact Check Monitor",
    navLanguage: "Language",
    navActivePortal: "Active Portal",
    navHelplineTitle: "National Helpline",
    navHelplineSub: "Toll-free • 24x7 Multi-lingual",

    headerWelcome: "Welcome",
    headerAskAi: "Ask JanCensus AI",
    headerNotices: "Official Notices",
    headerMarkRead: "Mark all read",
    headerMyProfile: "My Profile",
    headerSettings: "Settings",
    headerLogout: "Logout",
    headerAadhaarVerified: "Aadhaar OTP Verified",

    heroBadge: "India's 16th National Census • First Fully Digital Census",
    heroTitle: "Digitally Empowering Every Indian Citizen",
    heroDesc: "Participate in nation-building from the comfort of your home. Self-enumerate online, receive an instant verification QR Code, and ensure accurate representation.",
    heroStartSelfEnum: "Start Self-Enumeration Now",
    heroExploreAi: "Explore with AI Mitra",
    actionHubTitle: "Citizen Action Hub",
    actionHubSub: "Key services and informational portals for Census of India 2027",
    accessFeature: "Access Feature",

    cardScheduleTitle: "Check Schedule",
    cardScheduleSub: "State & district timeline for Census 2027",
    cardPhasesTitle: "Understand Phases",
    cardPhasesSub: "Detailed breakdown of Phase 1 vs Phase 2",
    cardSelfEnumTitle: "Self-Enumeration Guide",
    cardSelfEnumSub: "Pre-fill questionnaire & generate SE-ID QR",
    cardAiTitle: "Ask AI Assistant",
    cardAiSub: "Grounded instant answers with JanCensus Mitra",

    timelineTitle: "Census 2027 State Timeline Explorer",
    timelineSub: "Official Phase 1 (House Listing) and Phase 2 (Population Enumeration) schedules",
    timelineStateLabel: "State",
    phase1Title: "House Listing & Housing Census (HLH)",
    phase1Sub: "Lists all housing structures, amenities, and drinking water/latrine facilities.",
    phase1SelfEnumWindow: "Digital Self-Enumeration Window:",
    phase1FieldWindow: "Field Surveyor Verification:",
    phase1Action: "Pre-Fill Household Details",
    phase2Title: "Population Enumeration (PE)",
    phase2Sub: "Comprehensive count of every individual, demographics, education, and occupation.",
    phase2PortalWindow: "Self-Enumeration Portal:",
    phase2FieldWindow: "Physical Enumeration:",
    phase2Action: "Learn about Phase 2 Questions",
    legalSafetyTitle: "Your Information is 100% Statutorily Safe & Confidential",
    legalSafetyDesc: "Under Section 15 of the Census Act 1948, individual records cannot be shared with police, courts, or tax authorities.",
    legalSafetyAction: "Read Legal Protections",

    aiAssistantTitle: "JanCensus AI Mitra",
    aiAssistantSub: "Official Census 2027 Virtual Assistant",
    aiLegalRibbon: "Grounded in statutory rules of Census Act 1948.",
    aiQuickTitle: "Quick:",
    aiPlaceholder: "Ask about Census 2027 phases, schedule, privacy...",

    factCheckTitle: "Census 2027 Misinformation & Fact-Check Unit",
    factCheckSub: "Verify viral WhatsApp rumors, claims, and social media messages against official legal provisions.",
    factCheckInputLabel: "Paste Rumor or Claim to Fact-Check",
    factCheckPlaceholder: "e.g. Received a WhatsApp message saying enumerators are asking for bank passwords and charging 500 Rs...",
    factCheckButton: "Verify Claim Authenticity",
    factCheckVerifying: "Cross-referencing Official Records...",
    factCheckSampleTitle: "Frequently Circulated Rumors & Clarifications",
    verdictFact: "FACT",
    verdictMisinfo: "MISINFORMATION",
    verdictPartial: "PARTIALLY ACCURATE",

    guideTitle: "Household Self-Enumeration Portal",
    guideSub: "Complete your questionnaire online in 3 simple steps to generate an instant QR Code for field enumerators.",
    step1Title: "Head of Household & Dwelling Address",
    step2Title: "Housing Parameters & Basic Amenities",
    step3Title: "Family Members Residing in Household",
    headNameLabel: "Head of Household Full Name",
    mobileLabel: "Primary Mobile Number (for OTP/SMS)",
    stateLabel: "State / Union Territory",
    districtLabel: "District",
    pincodeLabel: "Pincode (6-Digit)",
    houseNumLabel: "Complete House Number & Street Address",
    dwellingTypeLabel: "Predominant Structure / Dwelling Type",
    waterSourceLabel: "Main Source of Drinking Water",
    lightingLabel: "Source of Lighting",
    latrineLabel: "Latrine Facility Access",
    submitGenerateQr: "Submit & Generate SE-ID QR Receipt",
    receiptTitle: "Digital Self-Enumeration Acknowledged!",
    receiptSub: "Your household submission is officially recorded. Present this reference or QR code to the field enumerator for 2-minute instant verification.",
    refIdLabel: "Self-Enumeration Reference ID",
    printSlip: "Print Slip",
    returnDashboard: "Return to Dashboard",

    adminTitle: "National Operations & Analytics Command",
    adminSub: "Live regional synchronization • Office of the Registrar General of India",
    campaignGenTitle: "AI Public Awareness Campaign Generator",
    campaignGenSub: "Generate localized multi-channel collateral (SMS, Social Media posts, Bulletins) for district collectors.",
    campaignTopicLabel: "Campaign Objective / Topic",
    campaignRegionLabel: "Target State & District",
    campaignAudienceLabel: "Target Audience Profile",
    campaignLangLabel: "Languages to Produce",
    campaignGenerateButton: "Generate Structured Campaign Materials",
  },
  hi: {
    navDashboard: "डैशबोर्ड",
    navPhases: "जनगणना के चरण",
    navSchedule: "राज्य समय सारिणी",
    navSelfEnum: "स्व-गणना (Self-Enum)",
    navAiAssistant: "एआई सहायक",
    navFactCheck: "फैक्ट चेक (सत्यता जांच)",
    navPrivacy: "गोपनीयता और सुरक्षा",
    navAnalytics: "विश्लेषण डैशबोर्ड",
    navCitizenPreview: "नागरिक पूर्वावलोकन",
    navFactCheckMonitor: "फैक्ट चेक निगरानी",
    navLanguage: "भाषा (Language)",
    navActivePortal: "सक्रिय पोर्टल",
    navHelplineTitle: "राष्ट्रीय हेल्पलाइन",
    navHelplineSub: "टोल-फ्री • 24x7 बहुभाषी",

    headerWelcome: "स्वागत है",
    headerAskAi: "जनजनगणना एआई से पूछें",
    headerNotices: "आधिकारिक सूचनाएं",
    headerMarkRead: "सभी पढ़े हुए के रूप में चिह्नित करें",
    headerMyProfile: "मेरी प्रोफाइल",
    headerSettings: "सेटिंग्स",
    headerLogout: "लॉगआउट",
    headerAadhaarVerified: "आधार ओटीपी सत्यापित",

    heroBadge: "भारत की 16वीं राष्ट्रीय जनगणना • पहली पूरी तरह से डिजिटल जनगणना",
    heroTitle: "हर भारतीय नागरिक को डिजिटल रूप से सशक्त बनाना",
    heroDesc: "अपने घर के आराम से राष्ट्र निर्माण में भाग लें। ऑनलाइन स्व-गणना करें, एक त्वरित सत्यापन क्यूआर कोड प्राप्त करें, और सटीक प्रतिनिधित्व सुनिश्चित करें।",
    heroStartSelfEnum: "अभी स्व-गणना शुरू करें",
    heroExploreAi: "एआई मित्र के साथ जानें",
    actionHubTitle: "नागरिक कार्य केंद्र",
    actionHubSub: "भारत की जनगणना 2027 के लिए मुख्य सेवाएं और सूचनात्मक पोर्टल",
    accessFeature: "सुविधा खोलें",

    cardScheduleTitle: "समय सारिणी देखें",
    cardScheduleSub: "जनगणना 2027 के लिए राज्य और जिला समय रेखा",
    cardPhasesTitle: "चरणों को समझें",
    cardPhasesSub: "चरण 1 बनाम चरण 2 का विस्तृत विवरण",
    cardSelfEnumTitle: "स्व-गणना निर्देशिका",
    cardSelfEnumSub: "प्रश्नावली पूर्व-भरें और SE-ID QR उत्पन्न करें",
    cardAiTitle: "एआई सहायक से पूछें",
    cardAiSub: "जनजनगणना मित्र के साथ त्वरित उत्तर पाएं",

    timelineTitle: "जनगणना 2027 राज्य समय सारिणी एक्सप्लोरर",
    timelineSub: "आधिकारिक चरण 1 (मकान सूचीकरण) और चरण 2 (जनसंख्या गणना) सारिणी",
    timelineStateLabel: "राज्य",
    phase1Title: "मकान सूचीकरण एवं मकान गणना (HLH)",
    phase1Sub: "सभी आवासीय संरचनाओं, सुविधाओं और पेयजल/शौचालय सुविधाओं को सूचीबद्ध करता है।",
    phase1SelfEnumWindow: "डिजिटल स्व-गणना खिड़की:",
    phase1FieldWindow: "क्षेत्रीय सर्वेक्षक सत्यापन:",
    phase1Action: "घरेलू विवरण पहले से भरें",
    phase2Title: "जनसंख्या गणना (PE)",
    phase2Sub: "प्रत्येक व्यक्ति, जनसांख्यिकी, शिक्षा और व्यवसाय की व्यापक गिनती।",
    phase2PortalWindow: "स्व-गणना पोर्टल:",
    phase2FieldWindow: "भौतिक गणना:",
    phase2Action: "चरण 2 प्रश्नों के बारे में जानें",
    legalSafetyTitle: "आपकी जानकारी 100% वैधानिक रूप से सुरक्षित और गोपनीय है",
    legalSafetyDesc: "जनगणना अधिनियम 1948 की धारा 15 के तहत, व्यक्तिगत रिकॉर्ड पुलिस, अदालतों या आयकर अधिकारियों के साथ साझा नहीं किए जा सकते।",
    legalSafetyAction: "कानूनी सुरक्षा पढ़ें",

    aiAssistantTitle: "जनजनगणना एआई मित्र",
    aiAssistantSub: "आधिकारिक जनगणना 2027 वर्चुअल असिस्टेंट",
    aiLegalRibbon: "जनगणना अधिनियम 1948 के वैधानिक नियमों पर आधारित।",
    aiQuickTitle: "त्वरित:",
    aiPlaceholder: "जनगणना 2027 के चरणों, समय सारिणी, गोपनीयता के बारे में पूछें...",

    factCheckTitle: "जनगणना 2027 भ्रामक सूचना एवं सत्यता जांच इकाई",
    factCheckSub: "आधिकारिक कानूनी प्रावधानों के खिलाफ वायरल व्हाट्सएप अफवाहों और दावों की पुष्टि करें।",
    factCheckInputLabel: "सत्यता जांच के लिए अफवाह या दावा चिपकाएं",
    factCheckPlaceholder: "उदा. एक व्हाट्सएप संदेश प्राप्त हुआ कि प्रगणक बैंक पासवर्ड मांग रहे हैं और 500 रुपये शुल्क ले रहे हैं...",
    factCheckButton: "दावे की प्रामाणिकता जांचें",
    factCheckVerifying: "आधिकारिक रिकॉर्ड का सत्यापन किया जा रहा है...",
    factCheckSampleTitle: "अक्सर प्रसारित अफवाहें और स्पष्टीकरण",
    verdictFact: "सत्य (FACT)",
    verdictMisinfo: "भ्रामक सूचना (MISINFORMATION)",
    verdictPartial: "आंशिक रूप से सटीक",

    guideTitle: "घरेलू स्व-गणना पोर्टल",
    guideSub: "क्षेत्रीय प्रगणकों के लिए तत्काल क्यूआर कोड उत्पन्न करने हेतु 3 सरल चरणों में ऑनलाइन अपनी प्रश्नावली पूरी करें।",
    step1Title: "परिवार का मुखिया और मकान का पता",
    step2Title: "आवास मानक और बुनियादी सुविधाएं",
    step3Title: "परिवार में रहने वाले सदस्य",
    headNameLabel: "परिवार के मुखिया का पूरा नाम",
    mobileLabel: "प्राथमिक मोबाइल नंबर (ओटीपी/एसएमएस हेतु)",
    stateLabel: "राज्य / केंद्र शासित प्रदेश",
    districtLabel: "जिला",
    pincodeLabel: "पिनकोड (6-अंक)",
    houseNumLabel: "पूरा मकान नंबर और गली का पता",
    dwellingTypeLabel: "मुख्य संरचना / मकान का प्रकार",
    waterSourceLabel: "पेयजल का मुख्य स्रोत",
    lightingLabel: "प्रकाश का स्रोत",
    latrineLabel: "शौचालय की सुविधा",
    submitGenerateQr: "सबमिट करें और SE-ID QR रसीद प्राप्त करें",
    receiptTitle: "डिजिटल स्व-गणना स्वीकार की गई!",
    receiptSub: "आपकी घरेलू प्रस्तुति आधिकारिक रूप से दर्ज कर ली गई है। 2-मिनट के त्वरित सत्यापन के लिए इसे प्रगणक को दिखाएं।",
    refIdLabel: "स्व-गणना संदर्भ आईडी (SE-ID)",
    printSlip: "रसीद प्रिंट करें",
    returnDashboard: "डैशबोर्ड पर लौटें",

    adminTitle: "राष्ट्रीय परिचालन एवं विश्लेषण कमान",
    adminSub: "लाइव क्षेत्रीय तुल्यकालन • भारत के महारजिस्ट्रार का कार्यालय",
    campaignGenTitle: "एआई जन जागरूकता अभियान जनरेटर",
    campaignGenSub: "जिला कलेक्टरों के लिए स्थानीयकृत बहु-चैनल सामग्री (एसएमएस, सोशल मीडिया पोस्ट, बुलेटिन) बनाएं।",
    campaignTopicLabel: "अभियान का उद्देश्य / विषय",
    campaignRegionLabel: "लक्षित राज्य और जिला",
    campaignAudienceLabel: "लक्षित दर्शक प्रोफ़ाइल",
    campaignLangLabel: "तैयार की जाने वाली भाषाएं",
    campaignGenerateButton: "संरचित अभियान सामग्री उत्पन्न करें",
  },
  mr: {
    navDashboard: "डॅशबोर्ड",
    navPhases: "जनगणनेचे टप्पे",
    navSchedule: "राज्य वेळापत्रक",
    navSelfEnum: "स्व-गणना (Self-Enum)",
    navAiAssistant: "एआय सहाय्यक",
    navFactCheck: "फॅक्ट चेक (तथ्य तपासणी)",
    navPrivacy: "गोपनीयता आणि सुरक्षा",
    navAnalytics: "विश्लेषण डॅशबोर्ड",
    navCitizenPreview: "नागरिक पूर्वावलोकन",
    navFactCheckMonitor: "फॅक्ट चेक नियंत्रण",
    navLanguage: "भाषा (Language)",
    navActivePortal: "सक्रिय पोर्टल",
    navHelplineTitle: "राष्ट्रीय हेल्पलाइन",
    navHelplineSub: "टोल-फ्री • 24x7 बहुभाषिक",

    headerWelcome: "सुस्वागतम",
    headerAskAi: "जनजनगणना एआय ला विचारा",
    headerNotices: "शासकीय सूचना",
    headerMarkRead: "सर्व वाचलेले म्हणून चिन्हांकित करा",
    headerMyProfile: "माझे प्रोफाईल",
    headerSettings: "सेटिंग्ज",
    headerLogout: "लॉगआउट",
    headerAadhaarVerified: "आधार ओटीपी सत्यापित",

    heroBadge: "भारताची १६ वी राष्ट्रीय जनगणना • पहिली पूर्णपणे डिजिटल जनगणना",
    heroTitle: "प्रत्येक भारतीय नागरिकाला डिजिटलदृष्ट्या सक्षम बनवणे",
    heroDesc: "आपल्या घरातूनच राष्ट्र उभारणीत सहभागी व्हा. ऑनलाइन स्व-गणना करा, त्वरित सत्यापन QR कोड मिळवा आणि अचूक प्रतिनिधित्व सुनिश्चित करा.",
    heroStartSelfEnum: "आत्ताच स्व-गणना सुरू करा",
    heroExploreAi: "एआय मित्रासोबत जाणून घ्या",
    actionHubTitle: "नागरिक कार्य केंद्र",
    actionHubSub: "भारत जनगणना २०२७ साठी प्रमुख सेवा आणि माहिती देणारे पोर्टल",
    accessFeature: "वैशिष्ट्य वापरा",

    cardScheduleTitle: "वेळापत्रक तपासा",
    cardScheduleSub: "जनगणना २०२७ साठी राज्य आणि जिल्हा कालमर्यादा",
    cardPhasesTitle: "टप्पे समजून घ्या",
    cardPhasesSub: "टप्पा १ विरुद्ध टप्पा २ चे तपशीलवार वर्णन",
    cardSelfEnumTitle: "स्व-गणना मार्गदर्शक",
    cardSelfEnumSub: "प्रश्नावली पूर्व-भरा आणि SE-ID QR मिळवा",
    cardAiTitle: "एआय सहाय्यकाला विचारा",
    cardAiSub: "जनजनगणना मित्रासोबत त्वरित उत्तरे मिळवा",

    timelineTitle: "जनगणना २०२७ राज्य वेळापत्रक एक्सप्लोरर",
    timelineSub: "अधिकृत टप्पा १ (घर यादी) आणि टप्पा २ (लोकसंख्या गणना) वेळापत्रक",
    timelineStateLabel: "राज्य",
    phase1Title: "घर यादी आणि गृहगणना (HLH)",
    phase1Sub: "सर्व निवासी रचना, सुविधा आणि पिण्याचे पाणी/शौचालय सुविधांची यादी करते.",
    phase1SelfEnumWindow: "डिजिटल स्व-गणना कालावधी:",
    phase1FieldWindow: "क्षेत्रीय सर्वेक्षक पडताळणी:",
    phase1Action: "कुटुंबाची माहिती आधीच भरा",
    phase2Title: "लोकसंख्या गणना (PE)",
    phase2Sub: "प्रत्येक व्यक्तीची सर्वसमावेशक मोजणी, लोकसंख्याशास्त्र, शिक्षण आणि व्यवसाय.",
    phase2PortalWindow: "स्व-गणना पोर्टल:",
    phase2FieldWindow: "प्रत्यक्ष मोजणी:",
    phase2Action: "टप्पा २ प्रश्नांबद्दल जाणून घ्या",
    legalSafetyTitle: "तुमची माहिती १००% कायद्यानुसार सुरक्षित आणि गुप्त आहे",
    legalSafetyDesc: "जनगणना कायदा १९४८ च्या कलम १५ नुसार, वैयक्तिक नोंदी पोलिस, न्यायालये किंवा आयकर अधिकाऱ्यांसोबत शेअर करता येत नाहीत.",
    legalSafetyAction: "कायदेशीर संरक्षण वाचा",

    aiAssistantTitle: "जनजनगणना एआय मित्र",
    aiAssistantSub: "अधिकृत जनगणना २०२७ व्हर्च्युअल असिस्टंट",
    aiLegalRibbon: "जनगणना कायदा १९४८ च्या वैधानिक नियमांवर आधारित.",
    aiQuickTitle: "त्वरित:",
    aiPlaceholder: "जनगणना २०२७ चे टप्पे, वेळापत्रक, गोपनीयतेबद्दल विचारा...",

    factCheckTitle: "जनगणना २०२७ खोटी माहिती आणि तथ्य तपासणी विभाग",
    factCheckSub: "अधिकृत कायदेशीर तरतुदींविरुद्ध व्हायरल व्हॉट्सॲप अफवा आणि दाव्यांची पडताळणी करा.",
    factCheckInputLabel: "तपासणीसाठी अफवा किंवा दावा पेस्ट करा",
    factCheckPlaceholder: "उदा. व्हॉट्सॲपवर मेसेज आला आहे की प्रगणक बँक पासवर्ड मागत आहेत आणि ५०० रुपये आकारत आहेत...",
    factCheckButton: "दाव्याची सत्यता तपासा",
    factCheckVerifying: "अधिकृत नोंदींची पडताळणी केली जात आहे...",
    factCheckSampleTitle: "सतत पसरणाऱ्या अफवा आणि स्पष्टीकरणे",
    verdictFact: "सत्य (FACT)",
    verdictMisinfo: "खोटी माहिती (MISINFORMATION)",
    verdictPartial: "अंशतः अचूक",

    guideTitle: "कौटुंबिक स्व-गणना पोर्टल",
    guideSub: "क्षेत्रीय प्रगणकांसाठी त्वरित QR कोड मिळवण्यासाठी ३ सोप्या टप्प्यांत तुमची प्रश्नावली ऑनलाइन पूर्ण करा.",
    step1Title: "कुटुंब प्रमुख आणि घराचा पत्ता",
    step2Title: "गृहनिर्माण मानके आणि मूलभूत सुविधा",
    step3Title: "कुटुंबातील राहणारे सदस्य",
    headNameLabel: "कुटुंब प्रमुखाचे पूर्ण नाव",
    mobileLabel: "प्राथमिक मोबाईल क्रमांक (OTP/SMS साठी)",
    stateLabel: "राज्य / केंद्रशासित प्रदेश",
    districtLabel: "जिल्हा",
    pincodeLabel: "पिनकोड (६-अंकी)",
    houseNumLabel: "पूर्ण घर क्रमांक आणि रस्त्याचा पत्ता",
    dwellingTypeLabel: "प्रमुख रचना / घराचा प्रकार",
    waterSourceLabel: "पिण्याच्या पाण्याचा मुख्य स्त्रोत",
    lightingLabel: "प्रकाशाचा स्त्रोत",
    latrineLabel: "शौचालय सुविधा",
    submitGenerateQr: "सबमिट करा आणि SE-ID QR पावती मिळवा",
    receiptTitle: "डिजिटल स्व-गणना स्वीकारली गेली!",
    receiptSub: "तुमची माहिती अधिकृतपणे नोंदवली गेली आहे. २ मिनिटांच्या पडताळणीसाठी ही पावती प्रगणकाला दाखवा.",
    refIdLabel: "स्व-गणना संदर्भ आयडी (SE-ID)",
    printSlip: "पावती प्रिंट करा",
    returnDashboard: "डॅशबोर्डवर परत जा",

    adminTitle: "राष्ट्रीय संचालन आणि विश्लेषण कमांड",
    adminSub: "थेट प्रादेशिक समन्वय • भारताचे महारजिस्ट्रार कार्यालय",
    campaignGenTitle: "एआय जन जागरूकता मोहीम जनरेटर",
    campaignGenSub: "जिल्हाधिकाऱ्यांसाठी स्थानिक बहु-चॅनेल साहित्य (SMS, सोशल मीडिया पोस्ट, बुलेटिन) तयार करा.",
    campaignTopicLabel: "मोहिमेचा उद्देश / विषय",
    campaignRegionLabel: "लक्ष्यित राज्य आणि जिल्हा",
    campaignAudienceLabel: "लक्ष्यित दर्शक प्रोफाईल",
    campaignLangLabel: "तयार करावयाच्या भाषा",
    campaignGenerateButton: "संरचित मोहीम साहित्य तयार करा",
  },
  ta: {
    navDashboard: "டாஷ்போர்டு",
    navPhases: "மக்கள் தொகை கணக்கெடுப்பு கட்டங்கள்",
    navSchedule: "மாநில அட்டவணை",
    navSelfEnum: "சுய கணக்கெடுப்பு",
    navAiAssistant: "AI உதவியாளர்",
    navFactCheck: "உண்மை சரிபார்ப்பு",
    navPrivacy: "தனியுரிமை மற்றும் பாதுகாப்பு",
    navAnalytics: "பகுப்பாய்வு டாஷ்போர்டு",
    navCitizenPreview: "குடிமகன் முன்னோட்டம்",
    navFactCheckMonitor: "உண்மை சரிபார்ப்பு கண்காணிப்பு",
    navLanguage: "மொழி (Language)",
    navActivePortal: "செயலில் உள்ள தளம்",
    navHelplineTitle: "தேசிய உதவி எண்",
    navHelplineSub: "கட்டணமில்லா எண் • 24x7 பன்மொழி",

    headerWelcome: "வரவேற்கிறோம்",
    headerAskAi: "ஜன்சென்சஸ் AI ஐக் கேளுங்கள்",
    headerNotices: "அதிகாரப்பூர்வ அறிவிப்புகள்",
    headerMarkRead: "அனைத்தையும் படித்ததாகக் குறிக்கவும்",
    headerMyProfile: "என் சுயவிவரம்",
    headerSettings: "அமைப்புகள்",
    headerLogout: "வெளியேறு",
    headerAadhaarVerified: "ஆதார் OTP சரிபார்க்கப்பட்டது",

    heroBadge: "இந்தியாவின் 16வது தேசிய மக்கள் தொகை கணக்கெடுப்பு • முதல் டிஜிட்டல் கணக்கெடுப்பு",
    heroTitle: "ஒவ்வொரு இந்திய குடிமகனுக்கும் டிஜிட்டல் அதிகாரம்",
    heroDesc: "உங்கள் வீட்டில் இருந்தபடியே தேசத்தை கட்டியெழுப்பும் பணியில் பங்கேற்கவும்.",
    heroStartSelfEnum: "சுய கணக்கெடுப்பைத் தொடங்குங்கள்",
    heroExploreAi: "AI மித்ராவுடன் அறியவும்",
    actionHubTitle: "குடிமக்கள் மைய மையம்",
    actionHubSub: "இந்திய மக்கள் தொகை கணக்கெடுப்பு 2027 க்கான சேவைகள்",
    accessFeature: "அம்சத்தை அணுகவும்",

    cardScheduleTitle: "அட்டவணையைச் சரிபார்க்கவும்",
    cardScheduleSub: "மாநில மற்றும் மாவட்ட காலக்கெடு",
    cardPhasesTitle: "கட்டங்களைப் புரிந்து கொள்ளுங்கள்",
    cardPhasesSub: "கட்டம் 1 மற்றும் கட்டம் 2 பற்றிய விவரங்கள்",
    cardSelfEnumTitle: "சுய கணக்கெடுப்பு வழிகாட்டி",
    cardSelfEnumSub: "கேள்வித்தாளை நிரப்பி SE-ID QR ஐப் பெறுங்கள்",
    cardAiTitle: "AI உதவியாளரிடம் கேளுங்கள்",
    cardAiSub: "உடனடி பதில்களைப் பெறுங்கள்",

    timelineTitle: "மக்கள் தொகை கணக்கெடுப்பு 2027 மாநில அட்டவணை",
    timelineSub: "அதிகாரப்பூர்வ அட்டவணைகள்",
    timelineStateLabel: "மாநிலம்",
    phase1Title: "வீடு பட்டியல் மற்றும் வீட்டுவசதி கணக்கெடுப்பு (HLH)",
    phase1Sub: "அனைத்து குடியிருப்பு அமைப்புகள் மற்றும் வசதிகளை பட்டியலிடுகிறது.",
    phase1SelfEnumWindow: "டிஜிட்டல் சுய கணக்கெடுப்பு காலம்:",
    phase1FieldWindow: "கள ஆய்வாளர் சரிபார்ப்பு:",
    phase1Action: "விவரங்களை முன் கூட்டியே நிரப்பவும்",
    phase2Title: "மக்கள் தொகை கணக்கெடுப்பு (PE)",
    phase2Sub: "ஒவ்வொரு நபரின் விவரங்கள் மற்றும் கணக்கெடுப்பு.",
    phase2PortalWindow: "சுய கணக்கெடுப்பு தளம்:",
    phase2FieldWindow: "நேரடி கணக்கெடுப்பு:",
    phase2Action: "கட்டம் 2 பற்றி அறியவும்",
    legalSafetyTitle: "உங்கள் தகவல்கள் 100% பாதுகாப்பானவை",
    legalSafetyDesc: "மக்கள் தொகை கணக்கெடுப்பு சட்டம் 1948 பிரிவு 15 இன் கீழ் பாதுகாக்கப்பட்டது.",
    legalSafetyAction: "சட்ட பாதுகாப்புகளைப் படிக்கவும்",

    aiAssistantTitle: "ஜன்சென்சஸ் AI மித்ரா",
    aiAssistantSub: "அதிகாரப்பூர்வ மெய்நிகர் உதவியாளர்",
    aiLegalRibbon: "சட்ட விதிகளின் அடிப்படையில் உருவாக்கப்பட்டது.",
    aiQuickTitle: "விரைவு:",
    aiPlaceholder: "கணக்கெடுப்பு பற்றிய கேள்விகளைக் கேளுங்கள்...",

    factCheckTitle: "உண்மை சரிபார்ப்பு பிரிவு",
    factCheckSub: "போலிச் செய்திகளைச் சரிபார்க்கவும்.",
    factCheckInputLabel: "செய்தியை இங்கே ஒட்டவும்",
    factCheckPlaceholder: "எ.கா. வாட்ஸ்அப் செய்தி சரிபார்ப்பு...",
    factCheckButton: "உண்மையைச் சரிபார்க்கவும்",
    factCheckVerifying: "சரிபார்க்கப்படுகிறது...",
    factCheckSampleTitle: "அடிக்கடி பரவும் வதந்திகள்",
    verdictFact: "உண்மை (FACT)",
    verdictMisinfo: "தவறான செய்தி (MISINFORMATION)",
    verdictPartial: "பகுதி உண்மை",

    guideTitle: "வீட்டு சுய கணக்கெடுப்பு தளம்",
    guideSub: "3 எளிய படிகளில் படிவத்தைப் பூர்த்தி செய்து QR குறியீட்டைப் பெறுங்கள்.",
    step1Title: "குடும்பத் தலைவர் மற்றும் முகவரி",
    step2Title: "வீட்டுவசதி மற்றும் அடிப்படை வசதிகள்",
    step3Title: "குடும்ப உறுப்பினர்கள்",
    headNameLabel: "குடும்பத் தலைவரின் முழுப் பெயர்",
    mobileLabel: "கைபேசி எண்",
    stateLabel: "மாநிலம்",
    districtLabel: "மாவட்டம்",
    pincodeLabel: "அஞ்சல் குறியீடு",
    houseNumLabel: "முழு முகவரி",
    dwellingTypeLabel: "வீட்டின் வகை",
    waterSourceLabel: "குடிநீர் ஆதாரம்",
    lightingLabel: "மின்சார ஆதாரம்",
    latrineLabel: "கழிப்பறை வசதி",
    submitGenerateQr: "சமர்ப்பித்து QR ரசீதைப் பெறுங்கள்",
    receiptTitle: "சுய கணக்கெடுப்பு வெற்றிகரமாக முடிந்தது!",
    receiptSub: "உங்கள் ரசீது பதிவு செய்யப்பட்டது.",
    refIdLabel: "குறிப்பு எண் (SE-ID)",
    printSlip: "ரசீதை அச்சிடவும்",
    returnDashboard: "டாஷ்போர்டிற்குத் திரும்பவும்",

    adminTitle: "தேசிய மேலாண்மை மையம்",
    adminSub: "இந்தியப் பதிவாளர் ஜெனரல் அலுவலகம்",
    campaignGenTitle: "AI விழிப்புணர்வு பிரச்சார உருவாக்கம்",
    campaignGenSub: "மாவட்ட அதிகாரிகளுக்கான செய்தி உருவாக்கம்.",
    campaignTopicLabel: "பிரச்சாரத் தலைப்பு",
    campaignRegionLabel: "இலக்கு மாவட்டம்",
    campaignAudienceLabel: "இலக்கு மக்கள்",
    campaignLangLabel: "மொழிகள்",
    campaignGenerateButton: "பிரச்சாரப் பொருட்களை உருவாக்கவும்",
  }
};

export const getTranslation = (langCode: string, key: keyof TranslationsMap): string => {
  const code = langCode ? langCode.toLowerCase() : "en";
  const dict = translations[code] || translations["en"];
  return dict[key] || translations["en"][key] || key;
};
