import { FortuneRequest } from "@/types/fortune";

function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const birth = new Date(dateOfBirth);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function getZodiacSign(dateOfBirth: string): { en: string; th: string } {
  const date = new Date(dateOfBirth);
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const signs: { en: string; th: string }[] = [
    { en: "Capricorn", th: "มังกร" }, { en: "Aquarius", th: "กุมภ์" },
    { en: "Pisces", th: "มีน" }, { en: "Aries", th: "เมษ" },
    { en: "Taurus", th: "พฤษภ" }, { en: "Gemini", th: "เมถุน" },
    { en: "Cancer", th: "กรกฎ" }, { en: "Leo", th: "สิงห์" },
    { en: "Virgo", th: "กันย์" }, { en: "Libra", th: "ตุลย์" },
    { en: "Scorpio", th: "พิจิก" }, { en: "Sagittarius", th: "ธนู" },
  ];
  const boundaries = [20, 19, 20, 20, 21, 21, 22, 23, 23, 23, 22, 22];
  const idx = (m - 1 + (d < boundaries[m - 1] ? 0 : 1)) % 12;
  return signs[idx];
}

function getChineseZodiac(dateOfBirth: string): { en: string; th: string } {
  const year = new Date(dateOfBirth).getFullYear();
  const animals = [
    { en: "Rat", th: "หนู" }, { en: "Ox", th: "วัว" }, { en: "Tiger", th: "เสือ" },
    { en: "Rabbit", th: "กระต่าย" }, { en: "Dragon", th: "มังกร" }, { en: "Snake", th: "งู" },
    { en: "Horse", th: "ม้า" }, { en: "Goat", th: "แพะ" }, { en: "Monkey", th: "ลิง" },
    { en: "Rooster", th: "ไก่" }, { en: "Dog", th: "สุนัข" }, { en: "Pig", th: "หมู" },
  ];
  return animals[(year - 1900) % 12];
}

function getLifePathNumber(dateOfBirth: string): number {
  const sum = dateOfBirth.replace(/-/g, "").split("").reduce((s, d) => s + parseInt(d), 0);
  let n = sum;
  while (n > 9 && n !== 11 && n !== 22) {
    n = n.toString().split("").reduce((s, d) => s + parseInt(d), 0);
  }
  return n;
}

export function buildFortunePrompt(request: FortuneRequest): string {
  const lang = request.lang ?? "th";
  const age = calculateAge(request.dateOfBirth);
  const zodiac = getZodiacSign(request.dateOfBirth);
  const chinese = getChineseZodiac(request.dateOfBirth);
  const lifeNumber = getLifePathNumber(request.dateOfBirth);

  const isThai = lang === "th";

  const langInstruction = isThai
    ? "ตอบเป็นภาษาไทยทั้งหมด ใช้ภาษาที่สวยงาม กวีนิพนธ์ และอ่านง่าย"
    : "Respond entirely in English using beautiful, poetic, and clear language";

  const zodiacLabel = isThai ? zodiac.th : zodiac.en;
  const chineseLabel = isThai ? chinese.th : chinese.en;

  return `You are a mystical and wise fortune teller with deep knowledge of astrology, numerology, and ancient wisdom. ${langInstruction}.

SEEKER'S PROFILE:
- Name: ${request.name}
- Age: ${age} years old
- Date of Birth: ${request.dateOfBirth}
- Western Zodiac Sign: ${zodiacLabel} (${zodiac.en})
- Chinese Zodiac: ${chineseLabel} (${chinese.en})
- Life Path Number: ${lifeNumber}

QUESTION FROM THE SEEKER:
"${request.question}"

Return ONLY valid JSON with exactly these keys (${isThai ? "all values must be in Thai" : "all values in English"}):

{
  "summary": "${isThai ? "ภาพรวมพลังงานจักรวาลของผู้ถาม 2-3 ประโยค ตอบคำถามโดยตรง" : "2-3 sentence mystical overview answering the question directly"}",
  "careerOutlook": "${isThai ? "2-3 ประโยคเกี่ยวกับโอกาสการงานและพลังงานวิชาชีพ อ้างอิงราศี${zodiacLabel}" : "2-3 sentences about career opportunities referencing their ${zodiac.en} traits"}",
  "financialOutlook": "${isThai ? "2-3 ประโยคเกี่ยวกับแนวโน้มการเงินและคำแนะนำที่นำไปปฏิบัติได้" : "2-3 sentences about financial prospects with actionable guidance"}",
  "relationshipOutlook": "${isThai ? "2-3 ประโยคเกี่ยวกับความรัก ความสัมพันธ์ และพลังงานทางอารมณ์" : "2-3 sentences about love, relationships, and emotional energy"}",
  "generalAdvice": "${isThai ? "2-3 ประโยคปัญญาอันทรงพลังที่เชื่อมกับเลขชีวิต${lifeNumber} จบด้วยข้อความสร้างแรงบันดาลใจ" : "2-3 sentences of wisdom tied to life path number ${lifeNumber}, ending with an inspiring message"}"
}

Guidelines:
- Be mystical yet grounded and practical
- Reference their specific zodiac (${zodiacLabel}) and life path number (${lifeNumber})
- Be positive but honest — include gentle warnings when appropriate
- Personalize deeply to their name and question`;
}
