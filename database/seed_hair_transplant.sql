-- =====================================================
-- Hair Transplant Page — CMS Seed
-- Sections: hero (already exists), hair_transplant_why,
--   hair_transplant_excellence, hair_transplant_risks,
--   hair_transplant_steps, hair_transplant_fue,
--   hair_transplant_natural, hair_transplant_timeline,
--   hair_transplant_faq
-- =====================================================

-- Ensure page row exists
INSERT OR IGNORE INTO pages (id, slug, title, title_en, page_type, status, template, sort_order)
VALUES ('page-hair-transplant', 'hair-transplant', 'השתלת שיער', 'Hair Transplantation', 'standard', 'published', 'default', 3);

-- =====================================================
-- 1. hair_transplant_why
-- =====================================================
INSERT OR REPLACE INTO page_sections (id, page_id, section_type, sort_order, is_visible)
VALUES ('section-ht-why', 'page-hair-transplant', 'hair_transplant_why', 2, 1);

INSERT OR REPLACE INTO section_content (id, section_id, field_name, field_type, value_text, language, sort_order) VALUES
  ('sc-ht-why-title-he', 'section-ht-why', 'title', 'text', 'למה השתלת שיער ?', 'he', 1),
  ('sc-ht-why-title-en', 'section-ht-why', 'title', 'text', 'למה השתלת שיער ?', 'en', 1),
  ('sc-ht-why-p1-he', 'section-ht-why', 'paragraph1', 'text', 'השתלת שיער היא הדרך היחידה להשיג צמיחה מחודשת וקבועה של שיער באזורים שבהם זקיקי השיער הידלדלו מאוד או נעלמו לחלוטין – כמו בקו שיער נסוג, בקרחת בקודקוד או באזורים נוספים.', 'he', 2),
  ('sc-ht-why-p1-en', 'section-ht-why', 'paragraph1', 'text', 'השתלת שיער היא הדרך היחידה להשיג צמיחה מחודשת וקבועה של שיער באזורים שבהם זקיקי השיער הידלדלו מאוד או נעלמו לחלוטין – כמו בקו שיער נסוג, בקרחת בקודקוד או באזורים נוספים.', 'en', 2),
  ('sc-ht-why-p2-he', 'section-ht-why', 'paragraph2', 'text', 'נשירת שיער עלולה לגרום למראה מבוגר יותר, לפגוע בתחושת החיוניות ואף לשדר חוסר בריאות. עבור רבים, ההשפעה אינה רק אסתטית אלא גם חברתית ומקצועית.', 'he', 3),
  ('sc-ht-why-p2-en', 'section-ht-why', 'paragraph2', 'text', 'נשירת שיער עלולה לגרום למראה מבוגר יותר, לפגוע בתחושת החיוניות ואף לשדר חוסר בריאות. עבור רבים, ההשפעה אינה רק אסתטית אלא גם חברתית ומקצועית.', 'en', 3),
  ('sc-ht-why-p3-he', 'section-ht-why', 'paragraph3', 'text', 'שחזור השיער באמצעות השתלה יכול לשנות באופן דרמטי את תחושת הדימוי העצמי והביטחון, ולאפשר לך להיראות כלפי חוץ כפי שאתה מרגיש בפנים. ברגע שהשיער מתחיל לצמוח באזור ההשתלה, תוכל ליהנות ממראה טבעי ובריא ולהרגיש מצוין עם השיער שלך תוך זמן קצר.', 'he', 4),
  ('sc-ht-why-p3-en', 'section-ht-why', 'paragraph3', 'text', 'שחזור השיער באמצעות השתלה יכול לשנות באופן דרמטי את תחושת הדימוי העצמי והביטחון, ולאפשר לך להיראות כלפי חוץ כפי שאתה מרגיש בפנים. ברגע שהשיער מתחיל לצמוח באזור ההשתלה, תוכל ליהנות ממראה טבעי ובריא ולהרגיש מצוין עם השיער שלך תוך זמן קצר.', 'en', 4),
  ('sc-ht-why-p4-he', 'section-ht-why', 'paragraph4', 'text', 'כיום, השתלות שיער אינן נחלתם של מעטים בלבד. בזכות טכנולוגיות מתקדמות, שיטות טיפול חדשניות ומחירים נגישים יותר – הפתרון זמין וריאלי עבור כל מי שמעוניין להחזיר לעצמו את מראה השיער ואת תחושת הביטחון.', 'he', 5),
  ('sc-ht-why-p4-en', 'section-ht-why', 'paragraph4', 'text', 'כיום, השתלות שיער אינן נחלתם של מעטים בלבד. בזכות טכנולוגיות מתקדמות, שיטות טיפול חדשניות ומחירים נגישים יותר – הפתרון זמין וריאלי עבור כל מי שמעוניין להחזיר לעצמו את מראה השיער ואת תחושת הביטחון.', 'en', 5),
  ('sc-ht-why-advtitle-he', 'section-ht-why', 'advantages_title', 'text', 'יתרונות השתלת שיער', 'he', 6),
  ('sc-ht-why-advtitle-en', 'section-ht-why', 'advantages_title', 'text', 'יתרונות השתלת שיער', 'en', 6);

-- advantages repeater (section_items)
INSERT OR REPLACE INTO section_items (id, section_id, item_group, sort_order, language, field_name, value) VALUES
  ('si-ht-why-adv1-title-he', 'section-ht-why', 'advantages', 1, 'he', 'title', 'שיפור הדימוי העצמי'),
  ('si-ht-why-adv1-title-en', 'section-ht-why', 'advantages', 1, 'en', 'title', 'שיפור הדימוי העצמי'),
  ('si-ht-why-adv1-desc-he', 'section-ht-why', 'advantages', 1, 'he', 'description', 'רמת הביטחון העצמי והמראה החיצוני משתפרים באופן ניכר, מה שמוביל לשיפור איכות החיים הכללית'),
  ('si-ht-why-adv1-desc-en', 'section-ht-why', 'advantages', 1, 'en', 'description', 'רמת הביטחון העצמי והמראה החיצוני משתפרים באופן ניכר, מה שמוביל לשיפור איכות החיים הכללית'),
  ('si-ht-why-adv2-title-he', 'section-ht-why', 'advantages', 2, 'he', 'title', 'פתרון קבוע'),
  ('si-ht-why-adv2-title-en', 'section-ht-why', 'advantages', 2, 'en', 'title', 'פתרון קבוע'),
  ('si-ht-why-adv2-desc-he', 'section-ht-why', 'advantages', 2, 'he', 'description', 'השיער המושתל גדל באופן טבעי ונשאר לכל החיים - ללא צורך בטיפולים נוספים או בהשתלות חוזרות'),
  ('si-ht-why-adv2-desc-en', 'section-ht-why', 'advantages', 2, 'en', 'description', 'השיער המושתל גדל באופן טבעי ונשאר לכל החיים - ללא צורך בטיפולים נוספים או בהשתלות חוזרות'),
  ('si-ht-why-adv3-title-he', 'section-ht-why', 'advantages', 3, 'he', 'title', 'מראה טבעי לחלוטין'),
  ('si-ht-why-adv3-title-en', 'section-ht-why', 'advantages', 3, 'en', 'title', 'מראה טבעי לחלוטין'),
  ('si-ht-why-adv3-desc-he', 'section-ht-why', 'advantages', 3, 'he', 'description', 'טכנולוגיה מתקדמת המאפשרת השתלה מדויקת של זקיקי שיער בזווית ובכיוון הטבעיים, ליצירת מראה אסתטי ואותנטי'),
  ('si-ht-why-adv3-desc-en', 'section-ht-why', 'advantages', 3, 'en', 'description', 'טכנולוגיה מתקדמת המאפשרת השתלה מדויקת של זקיקי שיער בזווית ובכיוון הטבעיים, ליצירת מראה אסתטי ואותנטי'),
  ('si-ht-why-adv4-title-he', 'section-ht-why', 'advantages', 4, 'he', 'title', 'ללא תחזוקה יומית'),
  ('si-ht-why-adv4-title-en', 'section-ht-why', 'advantages', 4, 'en', 'title', 'ללא תחזוקה יומית'),
  ('si-ht-why-adv4-desc-he', 'section-ht-why', 'advantages', 4, 'he', 'description', 'לאחר תקופת ההתאוששות, השיער מטופל בדיוק כמו שיער רגיל - ניתן לגזור, לצבוע ולעצב ללא מגבלות'),
  ('si-ht-why-adv4-desc-en', 'section-ht-why', 'advantages', 4, 'en', 'description', 'לאחר תקופת ההתאוששות, השיער מטופל בדיוק כמו שיער רגיל - ניתן לגזור, לצבוע ולעצב ללא מגבלות'),
  ('si-ht-why-adv5-title-he', 'section-ht-why', 'advantages', 5, 'he', 'title', 'ללא תופעות לוואי'),
  ('si-ht-why-adv5-title-en', 'section-ht-why', 'advantages', 5, 'en', 'title', 'ללא תופעות לוואי'),
  ('si-ht-why-adv5-desc-he', 'section-ht-why', 'advantages', 5, 'he', 'description', 'הליך בטוח המבוצע תחת הרדמה מקומית, עם שיעור סיבוכים נמוך במיוחד ותקופת החלמה קצרה'),
  ('si-ht-why-adv5-desc-en', 'section-ht-why', 'advantages', 5, 'en', 'description', 'הליך בטוח המבוצע תחת הרדמה מקומית, עם שיעור סיבוכים נמוך במיוחד ותקופת החלמה קצרה'),
  ('si-ht-why-adv6-title-he', 'section-ht-why', 'advantages', 6, 'he', 'title', 'השקעה חד-פעמית'),
  ('si-ht-why-adv6-title-en', 'section-ht-why', 'advantages', 6, 'en', 'title', 'השקעה חד-פעמית'),
  ('si-ht-why-adv6-desc-he', 'section-ht-why', 'advantages', 6, 'he', 'description', 'בניגוד לטיפולים תרופתיים או קוסמטיים מתמשכים, השתלת שיער היא פתרון חד-פעמי ללא עלויות נוספות'),
  ('si-ht-why-adv6-desc-en', 'section-ht-why', 'advantages', 6, 'en', 'description', 'בניגוד לטיפולים תרופתיים או קוסמטיים מתמשכים, השתלת שיער היא פתרון חד-פעמי ללא עלויות נוספות');

-- =====================================================
-- 2. hair_transplant_excellence
-- =====================================================
INSERT OR REPLACE INTO page_sections (id, page_id, section_type, sort_order, is_visible)
VALUES ('section-ht-excellence', 'page-hair-transplant', 'hair_transplant_excellence', 3, 1);

INSERT OR REPLACE INTO section_content (id, section_id, field_name, field_type, value_text, language, sort_order) VALUES
  ('sc-ht-exc-title-he', 'section-ht-excellence', 'title', 'text', 'השתלת שיער', 'he', 1),
  ('sc-ht-exc-title-en', 'section-ht-excellence', 'title', 'text', 'השתלת שיער', 'en', 1),
  ('sc-ht-exc-tl2-he', 'section-ht-excellence', 'title_line2', 'text', 'מקצועית ואסתטית', 'he', 2),
  ('sc-ht-exc-tl2-en', 'section-ht-excellence', 'title_line2', 'text', 'מקצועית ואסתטית', 'en', 2),
  ('sc-ht-exc-tl3-he', 'section-ht-excellence', 'title_line3', 'text', 'ברמה הגבוהה ביותר', 'he', 3),
  ('sc-ht-exc-tl3-en', 'section-ht-excellence', 'title_line3', 'text', 'ברמה הגבוהה ביותר', 'en', 3),
  ('sc-ht-exc-p1-he', 'section-ht-excellence', 'paragraph1', 'text', 'במרפאת ד"ר רימה לאופר־בריטבה אנו מתמחים בביצוע השתלות שיער מתקדמות, המשלבות מצוינות רפואית עם גישה אסתטית עדינה ומדויקת. כל הליך מתבצע על ידי רופאה מומחית ולא על ידי צוות טכנאים בלבד – כדי להבטיח דיוק מרבי, שימור מיטבי של זקיקים, אחוזי הצלחה גבוהים ותוצאה הרמונית וטבעית.', 'he', 4),
  ('sc-ht-exc-p1-en', 'section-ht-excellence', 'paragraph1', 'text', 'במרפאת ד"ר רימה לאופר־בריטבה אנו מתמחים בביצוע השתלות שיער מתקדמות, המשלבות מצוינות רפואית עם גישה אסתטית עדינה ומדויקת. כל הליך מתבצע על ידי רופאה מומחית ולא על ידי צוות טכנאים בלבד – כדי להבטיח דיוק מרבי, שימור מיטבי של זקיקים, אחוזי הצלחה גבוהים ותוצאה הרמונית וטבעית.', 'en', 4),
  ('sc-ht-exc-p2-he', 'section-ht-excellence', 'paragraph2', 'text', 'הקליניקה עושה שימוש בטכנולוגיות החדשניות ביותר בתחום השתלות השיער, המאפשרות טיפול יעיל, בטוח וללא צלקות נראות לעין. מעבר להיבט הרפואי, אנו רואים בחידוש קו השיער תהליך עיצובי ואסתטי – שילוב בין מדע לאמנות. תכנון קו השיער נעשה בהתאמה אישית למבנה הפנים, לקווי המתאר ולמאפייני השיער של כל מטופל ומטופלת, כך שהתוצאה נראית טבעית, מחמיאה ומשקפת את האישיות.', 'he', 5),
  ('sc-ht-exc-p2-en', 'section-ht-excellence', 'paragraph2', 'text', 'הקליניקה עושה שימוש בטכנולוגיות החדשניות ביותר בתחום השתלות השיער, המאפשרות טיפול יעיל, בטוח וללא צלקות נראות לעין. מעבר להיבט הרפואי, אנו רואים בחידוש קו השיער תהליך עיצובי ואסתטי – שילוב בין מדע לאמנות. תכנון קו השיער נעשה בהתאמה אישית למבנה הפנים, לקווי המתאר ולמאפייני השיער של כל מטופל ומטופלת, כך שהתוצאה נראית טבעית, מחמיאה ומשקפת את האישיות.', 'en', 5),
  ('sc-ht-exc-p3-he', 'section-ht-excellence', 'paragraph3', 'text', 'המטרה שלנו היא לא רק להשיב שיער – אלא להחזיר תחושת ביטחון, חיוניות ונראות צעירה לאורך שנים.', 'he', 6),
  ('sc-ht-exc-p3-en', 'section-ht-excellence', 'paragraph3', 'text', 'המטרה שלנו היא לא רק להשיב שיער – אלא להחזיר תחושת ביטחון, חיוניות ונראות צעירה לאורך שנים.', 'en', 6),
  ('sc-ht-exc-s1v-he', 'section-ht-excellence', 'stat1_value', 'text', '98%', 'he', 7),
  ('sc-ht-exc-s1v-en', 'section-ht-excellence', 'stat1_value', 'text', '98%', 'en', 7),
  ('sc-ht-exc-s1l-he', 'section-ht-excellence', 'stat1_label', 'text', 'שיעור הצלחה של ההשתלות', 'he', 8),
  ('sc-ht-exc-s1l-en', 'section-ht-excellence', 'stat1_label', 'text', 'שיעור הצלחה של ההשתלות', 'en', 8),
  ('sc-ht-exc-s2v-he', 'section-ht-excellence', 'stat2_value', 'text', '18', 'he', 9),
  ('sc-ht-exc-s2v-en', 'section-ht-excellence', 'stat2_value', 'text', '18', 'en', 9),
  ('sc-ht-exc-s2s-he', 'section-ht-excellence', 'stat2_suffix', 'text', 'חודשים', 'he', 10),
  ('sc-ht-exc-s2s-en', 'section-ht-excellence', 'stat2_suffix', 'text', 'חודשים', 'en', 10),
  ('sc-ht-exc-s2l-he', 'section-ht-excellence', 'stat2_label', 'text', 'מעקב רפואי לאחר הניתוח', 'he', 11),
  ('sc-ht-exc-s2l-en', 'section-ht-excellence', 'stat2_label', 'text', 'מעקב רפואי לאחר הניתוח', 'en', 11);

-- =====================================================
-- 3. hair_transplant_risks
-- =====================================================
INSERT OR REPLACE INTO page_sections (id, page_id, section_type, sort_order, is_visible)
VALUES ('section-ht-risks', 'page-hair-transplant', 'hair_transplant_risks', 4, 1);

INSERT OR REPLACE INTO section_content (id, section_id, field_name, field_type, value_text, language, sort_order) VALUES
  ('sc-ht-risks-title-he', 'section-ht-risks', 'title', 'text', 'אנו ממזערים', 'he', 1),
  ('sc-ht-risks-title-en', 'section-ht-risks', 'title', 'text', 'אנו ממזערים', 'en', 1),
  ('sc-ht-risks-tl2-he', 'section-ht-risks', 'title_line2', 'text', 'את כל הסיכונים', 'he', 2),
  ('sc-ht-risks-tl2-en', 'section-ht-risks', 'title_line2', 'text', 'את כל הסיכונים', 'en', 2),
  ('sc-ht-risks-tl3-he', 'section-ht-risks', 'title_line3', 'text', 'של השתלת שיער', 'he', 3),
  ('sc-ht-risks-tl3-en', 'section-ht-risks', 'title_line3', 'text', 'של השתלת שיער', 'en', 3);

INSERT OR REPLACE INTO section_items (id, section_id, item_group, sort_order, language, field_name, value) VALUES
  ('si-ht-risk1-title-he', 'section-ht-risks', 'risks', 1, 'he', 'title', 'זיהום'),
  ('si-ht-risk1-title-en', 'section-ht-risks', 'risks', 1, 'en', 'title', 'זיהום'),
  ('si-ht-risk1-desc-he', 'section-ht-risks', 'risks', 1, 'he', 'description', 'כמו בכל הליך כירורגי, גם בהשתלת שיער קיים סיכון מסוים לזיהום. במרפאתנו אנו רואים בבטיחותכם ערך עליון – לכן אנו מקפידים על סביבת טיפול נקייה ומבוקרת, תוך שימוש באמצעי סטריליזציה מתקדמים ועמידה בסטנדרטים הגבוהים ביותר של רפואה מודרנית. כך תוכלו לעבור את התהליך בראש שקט ובתחושת ביטחון מלאה.'),
  ('si-ht-risk1-desc-en', 'section-ht-risks', 'risks', 1, 'en', 'description', 'כמו בכל הליך כירורגי, גם בהשתלת שיער קיים סיכון מסוים לזיהום. במרפאתנו אנו רואים בבטיחותכם ערך עליון – לכן אנו מקפידים על סביבת טיפול נקייה ומבוקרת, תוך שימוש באמצעי סטריליזציה מתקדמים ועמידה בסטנדרטים הגבוהים ביותר של רפואה מודרנית. כך תוכלו לעבור את התהליך בראש שקט ובתחושת ביטחון מלאה.'),
  ('si-ht-risk1-icon-he', 'section-ht-risks', 'risks', 1, 'he', 'icon', 'Shield'),
  ('si-ht-risk1-icon-en', 'section-ht-risks', 'risks', 1, 'en', 'icon', 'Shield'),
  ('si-ht-risk2-title-he', 'section-ht-risks', 'risks', 2, 'he', 'title', 'כאב ודימום'),
  ('si-ht-risk2-title-en', 'section-ht-risks', 'risks', 2, 'en', 'title', 'כאב ודימום'),
  ('si-ht-risk2-desc-he', 'section-ht-risks', 'risks', 2, 'he', 'description', 'בימים הראשונים לאחר הטיפול ייתכן שחושו מעט אי־נוחות או תבחינו בדימום קל – תופעות שכיחות וחולפות. ברוב המקרים ניתן להקל על הכאב בעזרת משככי כאבים רגילים הנמכרים ללא מרשם.'),
  ('si-ht-risk2-desc-en', 'section-ht-risks', 'risks', 2, 'en', 'description', 'בימים הראשונים לאחר הטיפול ייתכן שחושו מעט אי־נוחות או תבחינו בדימום קל – תופעות שכיחות וחולפות. ברוב המקרים ניתן להקל על הכאב בעזרת משככי כאבים רגילים הנמכרים ללא מרשם.'),
  ('si-ht-risk2-icon-he', 'section-ht-risks', 'risks', 2, 'he', 'icon', 'Heart'),
  ('si-ht-risk2-icon-en', 'section-ht-risks', 'risks', 2, 'en', 'icon', 'Heart'),
  ('si-ht-risk3-title-he', 'section-ht-risks', 'risks', 3, 'he', 'title', 'נזק לזקיקי שיער'),
  ('si-ht-risk3-title-en', 'section-ht-risks', 'risks', 3, 'en', 'title', 'נזק לזקיקי שיער'),
  ('si-ht-risk3-desc-he', 'section-ht-risks', 'risks', 3, 'he', 'description', 'בתהליך השתלת שיער מסוג FUE חשוב ביותר שהחילוץ יתבצע במימנות גבוהה. ד"ר רימה מבצעת את שלב החילוץ ברמת דיוק מרבית, תוך הקפדה על מינימליזציה של נזק לזקיקים ושמירה על איכותם.'),
  ('si-ht-risk3-desc-en', 'section-ht-risks', 'risks', 3, 'en', 'description', 'בתהליך השתלת שיער מסוג FUE חשוב ביותר שהחילוץ יתבצע במימנות גבוהה. ד"ר רימה מבצעת את שלב החילוץ ברמת דיוק מרבית, תוך הקפדה על מינימליזציה של נזק לזקיקים ושמירה על איכותם.'),
  ('si-ht-risk3-icon-he', 'section-ht-risks', 'risks', 3, 'he', 'icon', 'Microscope'),
  ('si-ht-risk3-icon-en', 'section-ht-risks', 'risks', 3, 'en', 'icon', 'Microscope');

-- =====================================================
-- Sections 4-8 follow the same pattern.
-- For brevity, scalar content only (repeater items are
-- large). The remaining sections use section_type values:
--   hair_transplant_steps (sort_order 5)
--   hair_transplant_fue (sort_order 6)
--   hair_transplant_natural (sort_order 7)
--   hair_transplant_timeline (sort_order 8)
--   hair_transplant_faq (sort_order 9)
-- =====================================================

-- 4. hair_transplant_steps
INSERT OR REPLACE INTO page_sections (id, page_id, section_type, sort_order, is_visible)
VALUES ('section-ht-steps', 'page-hair-transplant', 'hair_transplant_steps', 5, 1);

INSERT OR REPLACE INTO section_content (id, section_id, field_name, field_type, value_text, language, sort_order) VALUES
  ('sc-ht-steps-title-he', 'section-ht-steps', 'title', 'text', 'תהליך השתלת השיער - צעד אחר צעד', 'he', 1),
  ('sc-ht-steps-title-en', 'section-ht-steps', 'title', 'text', 'תהליך השתלת השיער - צעד אחר צעד', 'en', 1),
  ('sc-ht-steps-sub-he', 'section-ht-steps', 'subtitle', 'text', 'המסע שלכם מתחיל בייעוץ מקצועי ומסתיים בתוצאות מרשימות. כל שלב מותאם אישית להבטחת התוצאות המיטביות והטבעיות ביותר', 'he', 2),
  ('sc-ht-steps-sub-en', 'section-ht-steps', 'subtitle', 'text', 'המסע שלכם מתחיל בייעוץ מקצועי ומסתיים בתוצאות מרשימות. כל שלב מותאם אישית להבטחת התוצאות המיטביות והטבעיות ביותר', 'en', 2);

-- steps repeater (7 items, reversed order in frontend so sort_order 1=step07, 7=step01)
INSERT OR REPLACE INTO section_items (id, section_id, item_group, sort_order, language, field_name, value) VALUES
  ('si-ht-st1-num-he', 'section-ht-steps', 'steps', 1, 'he', 'number', '07'),
  ('si-ht-st1-num-en', 'section-ht-steps', 'steps', 1, 'en', 'number', '07'),
  ('si-ht-st1-title-he', 'section-ht-steps', 'steps', 1, 'he', 'title', 'טיפול ומעקב לאחר ההשתלה'),
  ('si-ht-st1-title-en', 'section-ht-steps', 'steps', 1, 'en', 'title', 'טיפול ומעקב לאחר ההשתלה'),
  ('si-ht-st1-desc-he', 'section-ht-steps', 'steps', 1, 'he', 'description', 'עם סיום ההשתלה, המטופל מקבל הנחיות מפורטות לטיפול בבית – הכוללות שטיפות עדינות, הימנעות ממגע ישיר, הגנה משמש ומעקב רפואי יזום. ביום שלאחר ההשתלה מוזמן המטופל לבדיקה לוודא החלמה תקינה והיקלטות טובה של הזקיקים. שמירה על הנחיות אלו תורמת משמעותית לתוצאה מיטבית ולקליטה מוצלחת של הזקיקים.'),
  ('si-ht-st1-desc-en', 'section-ht-steps', 'steps', 1, 'en', 'description', 'עם סיום ההשתלה, המטופל מקבל הנחיות מפורטות לטיפול בבית – הכוללות שטיפות עדינות, הימנעות ממגע ישיר, הגנה משמש ומעקב רפואי יזום. ביום שלאחר ההשתלה מוזמן המטופל לבדיקה לוודא החלמה תקינה והיקלטות טובה של הזקיקים. שמירה על הנחיות אלו תורמת משמעותית לתוצאה מיטבית ולקליטה מוצלחת של הזקיקים.'),
  ('si-ht-st1-img-he', 'section-ht-steps', 'steps', 1, 'he', 'image', '/assets/bddabeb9312801e4a31888fa116771a55f8feecd_converted.jpg'),
  ('si-ht-st1-img-en', 'section-ht-steps', 'steps', 1, 'en', 'image', '/assets/bddabeb9312801e4a31888fa116771a55f8feecd_converted.jpg'),
  ('si-ht-st2-num-he', 'section-ht-steps', 'steps', 2, 'he', 'number', '06'),
  ('si-ht-st2-num-en', 'section-ht-steps', 'steps', 2, 'en', 'number', '06'),
  ('si-ht-st2-title-he', 'section-ht-steps', 'steps', 2, 'he', 'title', 'שלב ההשתלה'),
  ('si-ht-st2-title-en', 'section-ht-steps', 'steps', 2, 'en', 'title', 'שלב ההשתלה'),
  ('si-ht-st2-desc-he', 'section-ht-steps', 'steps', 2, 'he', 'description', 'כאשר נאסף מספר מספק של זקיקים, מתחיל שלב ההשתלה. במרפאה נעשה שימוש בשיטת ה-DHI המתקדמת באמצעות עט ההשתלה. הצוות הטיפולי טוען כל זקיק לעט ההשתלה ומוסר אותו לרופא, אשר קובע במדויק את כיוון, זווית ועומק ההחדרה. שיטה זו מאפשרת צפיפות גבוהה, שליטה מלאה בתוצאה והשתלה עדינה גם בין שיערות קיימות, ליצירת מראה טבעי לחלוטין.'),
  ('si-ht-st2-desc-en', 'section-ht-steps', 'steps', 2, 'en', 'description', 'כאשר נאסף מספר מספק של זקיקים, מתחיל שלב ההשתלה. במרפאה נעשה שימוש בשיטת ה-DHI המתקדמת באמצעות עט ההשתלה. הצוות הטיפולי טוען כל זקיק לעט ההשתלה ומוסר אותו לרופא, אשר קובע במדויק את כיוון, זווית ועומק ההחדרה. שיטה זו מאפשרת צפיפות גבוהה, שליטה מלאה בתוצאה והשתלה עדינה גם בין שיערות קיימות, ליצירת מראה טבעי לחלוטין.'),
  ('si-ht-st2-img-he', 'section-ht-steps', 'steps', 2, 'he', 'image', '/assets/ed7e487927b1921ddba979a5331d30577076e64a_converted.jpg'),
  ('si-ht-st2-img-en', 'section-ht-steps', 'steps', 2, 'en', 'image', '/assets/ed7e487927b1921ddba979a5331d30577076e64a_converted.jpg'),
  ('si-ht-st3-num-he', 'section-ht-steps', 'steps', 3, 'he', 'number', '05'),
  ('si-ht-st3-num-en', 'section-ht-steps', 'steps', 3, 'en', 'number', '05'),
  ('si-ht-st3-title-he', 'section-ht-steps', 'steps', 3, 'he', 'title', 'שימור והכנת הזקיקים להשתלה'),
  ('si-ht-st3-title-en', 'section-ht-steps', 'steps', 3, 'en', 'title', 'שימור והכנת הזקיקים להשתלה'),
  ('si-ht-st3-desc-he', 'section-ht-steps', 'steps', 3, 'he', 'description', 'לאחר חילוץ הזקיקים, הם עוברים ניקוי, מיון לפי מספר שיערות בכל יחידה, והשריה בתמיסה עשירה בפלזמה פעילה שמגבירה את אחוזי ההיקלטות והחיות של הזקיקים. הצלחות הפטרי עם הזקיקים נשמרות בקירור עד לשלב ההשתלה. שלב זה קריטי להצלחת התהליך ולשמירה על איכות הזקיקים עד להשתלתם.'),
  ('si-ht-st3-desc-en', 'section-ht-steps', 'steps', 3, 'en', 'description', 'לאחר חילוץ הזקיקים, הם עוברים ניקוי, מיון לפי מספר שיערות בכל יחידה, והשריה בתמיסה עשירה בפלזמה פעילה שמגבירה את אחוזי ההיקלטות והחיות של הזקיקים. הצלחות הפטרי עם הזקיקים נשמרות בקירור עד לשלב ההשתלה. שלב זה קריטי להצלחת התהליך ולשמירה על איכות הזקיקים עד להשתלתם.'),
  ('si-ht-st3-img-he', 'section-ht-steps', 'steps', 3, 'he', 'image', '/assets/93f0bf50542a3a7de20a3f0a5797139ecaa04fd6_converted.jpg'),
  ('si-ht-st3-img-en', 'section-ht-steps', 'steps', 3, 'en', 'image', '/assets/93f0bf50542a3a7de20a3f0a5797139ecaa04fd6_converted.jpg'),
  ('si-ht-st4-num-he', 'section-ht-steps', 'steps', 4, 'he', 'number', '04'),
  ('si-ht-st4-num-en', 'section-ht-steps', 'steps', 4, 'en', 'number', '04'),
  ('si-ht-st4-title-he', 'section-ht-steps', 'steps', 4, 'he', 'title', 'חילוץ הזקיקים'),
  ('si-ht-st4-title-en', 'section-ht-steps', 'steps', 4, 'en', 'title', 'חילוץ הזקיקים'),
  ('si-ht-st4-desc-he', 'section-ht-steps', 'steps', 4, 'he', 'description', 'אזור התרומה, לרוב בחלק האחורי או בצידי הקרקפת, הוא המקום ממנו נלקחים הזקיקים להשתלה. בשיטת FUE מחלצים כל זקיק שיער בנפרד באמצעות מיקרו-מכשור כירורגי מתקדם. החילוץ מבוצע בזהירות מירבית כדי לשמור על שלמות הזקיקים ועל המראה האסתטי של אזור התרומה – ללא חתך ליניארי וללא צלקת נראית לעין.'),
  ('si-ht-st4-desc-en', 'section-ht-steps', 'steps', 4, 'en', 'description', 'אזור התרומה, לרוב בחלק האחורי או בצידי הקרקפת, הוא המקום ממנו נלקחים הזקיקים להשתלה. בשיטת FUE מחלצים כל זקיק שיער בנפרד באמצעות מיקרו-מכשור כירורגי מתקדם. החילוץ מבוצע בזהירות מירבית כדי לשמור על שלמות הזקיקים ועל המראה האסתטי של אזור התרומה – ללא חתך ליניארי וללא צלקת נראית לעין.'),
  ('si-ht-st4-img-he', 'section-ht-steps', 'steps', 4, 'he', 'image', '/assets/a1a54e40bec20e5cfd24a912af5359fb4e43b190_converted.jpg'),
  ('si-ht-st4-img-en', 'section-ht-steps', 'steps', 4, 'en', 'image', '/assets/a1a54e40bec20e5cfd24a912af5359fb4e43b190_converted.jpg'),
  ('si-ht-st5-num-he', 'section-ht-steps', 'steps', 5, 'he', 'number', '03'),
  ('si-ht-st5-num-en', 'section-ht-steps', 'steps', 5, 'en', 'number', '03'),
  ('si-ht-st5-title-he', 'section-ht-steps', 'steps', 5, 'he', 'title', 'חישוב פיזור הזקיקים'),
  ('si-ht-st5-title-en', 'section-ht-steps', 'steps', 5, 'en', 'title', 'חישוב פיזור הזקיקים'),
  ('si-ht-st5-desc-he', 'section-ht-steps', 'steps', 5, 'he', 'description', 'אנו מבצעים חישוב מדויק לפיזור הזקיקים, המתחשב באופן אישי בצרכי המטופל (כולל צפיפות, שטח הטיפול ועיצוב קו השיער). תכנון מוקפד זה מבטיח תוצאה אופטימלית: מראה טבעי, אחיד ובהרמוניה מלאה עם פני המטופל'),
  ('si-ht-st5-desc-en', 'section-ht-steps', 'steps', 5, 'en', 'description', 'אנו מבצעים חישוב מדויק לפיזור הזקיקים, המתחשב באופן אישי בצרכי המטופל (כולל צפיפות, שטח הטיפול ועיצוב קו השיער). תכנון מוקפד זה מבטיח תוצאה אופטימלית: מראה טבעי, אחיד ובהרמוניה מלאה עם פני המטופל'),
  ('si-ht-st5-img-he', 'section-ht-steps', 'steps', 5, 'he', 'image', '/assets/6b7f0b6e7b8ea6e94a52635c55298431ed2262d4_converted.jpg'),
  ('si-ht-st5-img-en', 'section-ht-steps', 'steps', 5, 'en', 'image', '/assets/6b7f0b6e7b8ea6e94a52635c55298431ed2262d4_converted.jpg'),
  ('si-ht-st6-num-he', 'section-ht-steps', 'steps', 6, 'he', 'number', '02'),
  ('si-ht-st6-num-en', 'section-ht-steps', 'steps', 6, 'en', 'number', '02'),
  ('si-ht-st6-title-he', 'section-ht-steps', 'steps', 6, 'he', 'title', 'עיצוב קן השיער'),
  ('si-ht-st6-title-en', 'section-ht-steps', 'steps', 6, 'en', 'title', 'עיצוב קן השיער'),
  ('si-ht-st6-desc-he', 'section-ht-steps', 'steps', 6, 'he', 'description', 'עיצוב קו השיער בהשתלת שיער הוא תהליך אישי, אמנותי וטכני. מטרתו ליצור מראה טבעי התואם את גיל המטופל, תוך התחשבות במבנה הפנים, נשירת השיער הצפויה והצבה מדויקת של השתלים.'),
  ('si-ht-st6-desc-en', 'section-ht-steps', 'steps', 6, 'en', 'description', 'עיצוב קו השיער בהשתלת שיער הוא תהליך אישי, אמנותי וטכני. מטרתו ליצור מראה טבעי התואם את גיל המטופל, תוך התחשבות במבנה הפנים, נשירת השיער הצפויה והצבה מדויקת של השתלים.'),
  ('si-ht-st6-img-he', 'section-ht-steps', 'steps', 6, 'he', 'image', '/assets/5e4b7f508ccb7b2d1d3893a858f13b22ed5d3bce_converted.jpg'),
  ('si-ht-st6-img-en', 'section-ht-steps', 'steps', 6, 'en', 'image', '/assets/5e4b7f508ccb7b2d1d3893a858f13b22ed5d3bce_converted.jpg'),
  ('si-ht-st7-num-he', 'section-ht-steps', 'steps', 7, 'he', 'number', '01'),
  ('si-ht-st7-num-en', 'section-ht-steps', 'steps', 7, 'en', 'number', '01'),
  ('si-ht-st7-title-he', 'section-ht-steps', 'steps', 7, 'he', 'title', 'פגישת ייעוץ'),
  ('si-ht-st7-title-en', 'section-ht-steps', 'steps', 7, 'en', 'title', 'פגישת ייעוץ'),
  ('si-ht-st7-desc-he', 'section-ht-steps', 'steps', 7, 'he', 'description', 'לפני השתלת שיער מתקיימת פגישת ייעוץ אישית עם דר'' רימה, במהלכה נבחנים ההיסטוריה הרפואית, מחלות עוריות או סיסטמיות, והטיפולים התרופתיים שעשויים להשפיע על צמיחת השיער. בנוסף, מוערכים תזונה, אורח חיים וגורמים מתח סביבתיים. בסיום מתבצעת בדיקה קלינית ודרמוסקופית של הקרקפת להערכת צפיפות ואיכות הזקיקים, ועל בסיס ממצאים אלו מותאמת תכנית טיפול אישית ותוצאה צפויה ריאלית.'),
  ('si-ht-st7-desc-en', 'section-ht-steps', 'steps', 7, 'en', 'description', 'לפני השתלת שיער מתקיימת פגישת ייעוץ אישית עם דר'' רימה, במהלכה נבחנים ההיסטוריה הרפואית, מחלות עוריות או סיסטמיות, והטיפולים התרופתיים שעשויים להשפיע על צמיחת השיער. בנוסף, מוערכים תזונה, אורח חיים וגורמים מתח סביבתיים. בסיום מתבצעת בדיקה קלינית ודרמוסקופית של הקרקפת להערכת צפיפות ואיכות הזקיקים, ועל בסיס ממצאים אלו מותאמת תכנית טיפול אישית ותוצאה צפויה ריאלית.'),
  ('si-ht-st7-img-he', 'section-ht-steps', 'steps', 7, 'he', 'image', '/assets/16b8df6bf70f413ac77e5c54e5f658cb82e506bb_converted.jpg'),
  ('si-ht-st7-img-en', 'section-ht-steps', 'steps', 7, 'en', 'image', '/assets/16b8df6bf70f413ac77e5c54e5f658cb82e506bb_converted.jpg');

-- =====================================================
-- 5. hair_transplant_fue
-- =====================================================
INSERT OR REPLACE INTO page_sections (id, page_id, section_type, sort_order, is_visible)
VALUES ('section-ht-fue', 'page-hair-transplant', 'hair_transplant_fue', 6, 1);

INSERT OR REPLACE INTO section_content (id, section_id, field_name, field_type, value_text, language, sort_order) VALUES
  ('sc-ht-fue-title-he', 'section-ht-fue', 'title', 'text', 'מהי השתלת שיער בשיטת FUE ?', 'he', 1),
  ('sc-ht-fue-title-en', 'section-ht-fue', 'title', 'text', 'מהי השתלת שיער בשיטת FUE ?', 'en', 1),
  ('sc-ht-fue-tl2-he', 'section-ht-fue', 'title_line2', 'text', 'Follicular Unit Excision', 'he', 2),
  ('sc-ht-fue-tl2-en', 'section-ht-fue', 'title_line2', 'text', 'Follicular Unit Excision', 'en', 2),
  ('sc-ht-fue-p1-he', 'section-ht-fue', 'paragraph1', 'text', 'השתלת שיער בשיטת FUE היא שיטה מתקדמת להשבת שיער טבעי, המאפשרת תוצאות מדויקות וטבעיות במיוחד. השיטה מבוססת על הוצאה עדינה של יחידות שיער בודדות מאזורי תורם והשתלתן באזורים הזקוקים לטיפול. כל יחידה זקיקית מכילה אשכול טבעי של 1 עד 4 שערות הגדלות יחד, מה שמבטיח מראה אורגני ואותנטי לאחר ההשתלה.', 'he', 3),
  ('sc-ht-fue-p1-en', 'section-ht-fue', 'paragraph1', 'text', 'השתלת שיער בשיטת FUE היא שיטה מתקדמת להשבת שיער טבעי, המאפשרת תוצאות מדויקות וטבעיות במיוחד. השיטה מבוססת על הוצאה עדינה של יחידות שיער בודדות מאזורי תורם והשתלתן באזורים הזקוקים לטיפול. כל יחידה זקיקית מכילה אשכול טבעי של 1 עד 4 שערות הגדלות יחד, מה שמבטיח מראה אורגני ואותנטי לאחר ההשתלה.', 'en', 3),
  ('sc-ht-fue-p2-he', 'section-ht-fue', 'paragraph2', 'text', 'ההליך מתבצע באמצעות מכשירי מיקרו מתקדמים בקוטר זעיר, המאפשרים דיוק מקסימלי והותרת צלקות מינימליות. אזור התורם העיקרי הוא החלק האחורי והצדדים של הראש, שם זקיקי השיער עמידים יותר להתקרחות ושומרים על תכונותיהם גם לאחר ההשתלה. במקרים מתאימים, ניתן גם לקחת שיער מאזורים נוספים כמו הזקן או חלקי גוף אחרים, דבר המרחיב את האפשרויות הטיפוליות. הזקיקים מושתלים בעיקר באזורים קרחים או מדוללים בקרקפת, אך ניתן גם להשתיל באזורי גוף אחרים בהתאם לצורך האסתטי, כגון גבות, זקן או שפם.', 'he', 4),
  ('sc-ht-fue-p2-en', 'section-ht-fue', 'paragraph2', 'text', 'ההליך מתבצע באמצעות מכשירי מיקרו מתקדמים בקוטר זעיר, המאפשרים דיוק מקסימלי והותרת צלקות מינימליות. אזור התורם העיקרי הוא החלק האחורי והצדדים של הראש, שם זקיקי השיער עמידים יותר להתקרחות ושומרים על תכונותיהם גם לאחר ההשתלה. במקרים מתאימים, ניתן גם לקחת שיער מאזורים נוספים כמו הזקן או חלקי גוף אחרים, דבר המרחיב את האפשרויות הטיפוליות. הזקיקים מושתלים בעיקר באזורים קרחים או מדוללים בקרקפת, אך ניתן גם להשתיל באזורי גוף אחרים בהתאם לצורך האסתטי, כגון גבות, זקן או שפם.', 'en', 4),
  ('sc-ht-fue-p3-he', 'section-ht-fue', 'paragraph3', 'text', 'שיטת FUE מציעה יתרונות משמעותיים הכוללים צלקות נקודתיות זעירות וכמעט בלתי נראות, החלמה מהירה יותר, גמישות בבחירת תסרוקת כולל תספורות קצרות, ובעיקר - תוצאות טבעיות לחלוטין שנשמרות לאורך זמן.', 'he', 5),
  ('sc-ht-fue-p3-en', 'section-ht-fue', 'paragraph3', 'text', 'שיטת FUE מציעה יתרונות משמעותיים הכוללים צלקות נקודתיות זעירות וכמעט בלתי נראות, החלמה מהירה יותר, גמישות בבחירת תסרוקת כולל תספורות קצרות, ובעיקר - תוצאות טבעיות לחלוטין שנשמרות לאורך זמן.', 'en', 5),
  ('sc-ht-fue-advtitle-he', 'section-ht-fue', 'advantages_title', 'text', 'יתרונות עיקריים', 'he', 6),
  ('sc-ht-fue-advtitle-en', 'section-ht-fue', 'advantages_title', 'text', 'יתרונות עיקריים', 'en', 6),
  ('sc-ht-fue-advtl2-he', 'section-ht-fue', 'advantages_title_line2', 'text', 'של', 'he', 7),
  ('sc-ht-fue-advtl2-en', 'section-ht-fue', 'advantages_title_line2', 'text', 'של', 'en', 7),
  ('sc-ht-fue-advtl3-he', 'section-ht-fue', 'advantages_title_line3', 'text', 'שיטת FUE', 'he', 8),
  ('sc-ht-fue-advtl3-en', 'section-ht-fue', 'advantages_title_line3', 'text', 'שיטת FUE', 'en', 8);

-- fue advantages repeater (6 items)
INSERT OR REPLACE INTO section_items (id, section_id, item_group, sort_order, language, field_name, value) VALUES
  ('si-ht-fue-adv1-title-he', 'section-ht-fue', 'advantages', 1, 'he', 'title', 'תוצאות טבעיות'),
  ('si-ht-fue-adv1-title-en', 'section-ht-fue', 'advantages', 1, 'en', 'title', 'תוצאות טבעיות'),
  ('si-ht-fue-adv1-desc-he', 'section-ht-fue', 'advantages', 1, 'he', 'description', 'מראה אורגני ואותנטי של השיער החדש עם צמיחה טבעית לחלוטין'),
  ('si-ht-fue-adv1-desc-en', 'section-ht-fue', 'advantages', 1, 'en', 'description', 'מראה אורגני ואותנטי של השיער החדש עם צמיחה טבעית לחלוטין'),
  ('si-ht-fue-adv2-title-he', 'section-ht-fue', 'advantages', 2, 'he', 'title', 'ללא צלקות נראות'),
  ('si-ht-fue-adv2-title-en', 'section-ht-fue', 'advantages', 2, 'en', 'title', 'ללא צלקות נראות'),
  ('si-ht-fue-adv2-desc-he', 'section-ht-fue', 'advantages', 2, 'he', 'description', 'צלקות נקודתיות זעירות הבלתי נראות לעין, ללא צלקת ליניארית'),
  ('si-ht-fue-adv2-desc-en', 'section-ht-fue', 'advantages', 2, 'en', 'description', 'צלקות נקודתיות זעירות הבלתי נראות לעין, ללא צלקת ליניארית'),
  ('si-ht-fue-adv3-title-he', 'section-ht-fue', 'advantages', 3, 'he', 'title', 'החלמה מהירה'),
  ('si-ht-fue-adv3-title-en', 'section-ht-fue', 'advantages', 3, 'en', 'title', 'החלמה מהירה'),
  ('si-ht-fue-adv3-desc-he', 'section-ht-fue', 'advantages', 3, 'he', 'description', 'חזרה לפעילות רגילה תוך ימים ספורים עם אי נוחות מינימלית'),
  ('si-ht-fue-adv3-desc-en', 'section-ht-fue', 'advantages', 3, 'en', 'description', 'חזרה לפעילות רגילה תוך ימים ספורים עם אי נוחות מינימלית'),
  ('si-ht-fue-adv4-title-he', 'section-ht-fue', 'advantages', 4, 'he', 'title', 'דיוק מקסימלי'),
  ('si-ht-fue-adv4-title-en', 'section-ht-fue', 'advantages', 4, 'en', 'title', 'דיוק מקסימלי'),
  ('si-ht-fue-adv4-desc-he', 'section-ht-fue', 'advantages', 4, 'he', 'description', 'מכשירי מיקרו מתקדמים לתוצאות מדויקות ופגיעה מינימלית ברקמות'),
  ('si-ht-fue-adv4-desc-en', 'section-ht-fue', 'advantages', 4, 'en', 'description', 'מכשירי מיקרו מתקדמים לתוצאות מדויקות ופגיעה מינימלית ברקמות'),
  ('si-ht-fue-adv5-title-he', 'section-ht-fue', 'advantages', 5, 'he', 'title', 'יעילות גבוהה'),
  ('si-ht-fue-adv5-title-en', 'section-ht-fue', 'advantages', 5, 'en', 'title', 'יעילות גבוהה'),
  ('si-ht-fue-adv5-desc-he', 'section-ht-fue', 'advantages', 5, 'he', 'description', 'שימור מקסימלי של זקיקי שיער איכותיים עם שיעור הצלחה גבוה'),
  ('si-ht-fue-adv5-desc-en', 'section-ht-fue', 'advantages', 5, 'en', 'description', 'שימור מקסימלי של זקיקי שיער איכותיים עם שיעור הצלחה גבוה'),
  ('si-ht-fue-adv6-title-he', 'section-ht-fue', 'advantages', 6, 'he', 'title', 'גמישות בתסרוקת'),
  ('si-ht-fue-adv6-title-en', 'section-ht-fue', 'advantages', 6, 'en', 'title', 'גמישות בתסרוקת'),
  ('si-ht-fue-adv6-desc-he', 'section-ht-fue', 'advantages', 6, 'he', 'description', 'אפשרות לתספורות קצרות ללא חשיפת צלקות ומראה טבעי מושלם'),
  ('si-ht-fue-adv6-desc-en', 'section-ht-fue', 'advantages', 6, 'en', 'description', 'אפשרות לתספורות קצרות ללא חשיפת צלקות ומראה טבעי מושלם');

-- =====================================================
-- 6. hair_transplant_natural
-- =====================================================
INSERT OR REPLACE INTO page_sections (id, page_id, section_type, sort_order, is_visible)
VALUES ('section-ht-natural', 'page-hair-transplant', 'hair_transplant_natural', 7, 1);

INSERT OR REPLACE INTO section_content (id, section_id, field_name, field_type, value_text, language, sort_order) VALUES
  ('sc-ht-nat-title-he', 'section-ht-natural', 'title', 'text', 'מה יוצר מראה טבעי', 'he', 1),
  ('sc-ht-nat-title-en', 'section-ht-natural', 'title', 'text', 'מה יוצר מראה טבעי', 'en', 1),
  ('sc-ht-nat-tl2-he', 'section-ht-natural', 'title_line2', 'text', 'לאחר השתלת שיער?', 'he', 2),
  ('sc-ht-nat-tl2-en', 'section-ht-natural', 'title_line2', 'text', 'לאחר השתלת שיער?', 'en', 2),
  ('sc-ht-nat-desc-he', 'section-ht-natural', 'description', 'text', 'אחד הגורמים החשובים ביותר בהצלחת השתלת שיער הוא המראה הטבעי של התוצאה. כדי להגיע לכך, נדרשת תשומת לב לפרטים הקטנים ביותר ולשילוב נכון בין טכניקה רפואית מדויקת לבין הבנה אסתטית.', 'he', 3),
  ('sc-ht-nat-desc-en', 'section-ht-natural', 'description', 'text', 'אחד הגורמים החשובים ביותר בהצלחת השתלת שיער הוא המראה הטבעי של התוצאה. כדי להגיע לכך, נדרשת תשומת לב לפרטים הקטנים ביותר ולשילוב נכון בין טכניקה רפואית מדויקת לבין הבנה אסתטית.', 'en', 3),
  ('sc-ht-nat-desc2-he', 'section-ht-natural', 'description2', 'text', 'בזכות שילוב עקרונות הבאים, השתלת שיער מתבצעת כך שהתוצאה הסופית נראית טבעית לחלוטין – כאילו לא בוצע טיפול כלל, אלא השיער פשוט צמח מחדש.', 'he', 4),
  ('sc-ht-nat-desc2-en', 'section-ht-natural', 'description2', 'text', 'בזכות שילוב עקרונות הבאים, השתלת שיער מתבצעת כך שהתוצאה הסופית נראית טבעית לחלוטין – כאילו לא בוצע טיפול כלל, אלא השיער פשוט צמח מחדש.', 'en', 4);

-- natural topics repeater (5 items)
INSERT OR REPLACE INTO section_items (id, section_id, item_group, sort_order, language, field_name, value) VALUES
  ('si-ht-nat1-title-he', 'section-ht-natural', 'topics', 1, 'he', 'title', 'עיצוב קו השיער'),
  ('si-ht-nat1-title-en', 'section-ht-natural', 'topics', 1, 'en', 'title', 'עיצוב קו השיער'),
  ('si-ht-nat1-desc-he', 'section-ht-natural', 'topics', 1, 'he', 'description', 'קו השיער הוא קימור ייחודי ומותאם אישית המושפע מגיל, מבנה עצם, הבעות פנים ופיזור שיער. התעלמות מניואנסים אלו מובילה לתוצאות מלאכותיות. זו הסיבה שבגללה עינו האמנותית של המנתח חיונית לא פחות מטכניקת ההשתלה עצמה.'),
  ('si-ht-nat1-desc-en', 'section-ht-natural', 'topics', 1, 'en', 'description', 'קו השיער הוא קימור ייחודי ומותאם אישית המושפע מגיל, מבנה עצם, הבעות פנים ופיזור שיער. התעלמות מניואנסים אלו מובילה לתוצאות מלאכותיות. זו הסיבה שבגללה עינו האמנותית של המנתח חיונית לא פחות מטכניקת ההשתלה עצמה.'),
  ('si-ht-nat2-title-he', 'section-ht-natural', 'topics', 2, 'he', 'title', 'צפיפות נכונה'),
  ('si-ht-nat2-title-en', 'section-ht-natural', 'topics', 2, 'en', 'title', 'צפיפות נכונה'),
  ('si-ht-nat2-desc-he', 'section-ht-natural', 'topics', 2, 'he', 'description', 'יצירת שילוב אידיאלי בין השיער הקיים לבין הזקיקים המושתלים, כדי להגיע לנפח טבעי ואחיד.'),
  ('si-ht-nat2-desc-en', 'section-ht-natural', 'topics', 2, 'en', 'description', 'יצירת שילוב אידיאלי בין השיער הקיים לבין הזקיקים המושתלים, כדי להגיע לנפח טבעי ואחיד.'),
  ('si-ht-nat3-title-he', 'section-ht-natural', 'topics', 3, 'he', 'title', 'זווית וכיוון הצמיחה'),
  ('si-ht-nat3-title-en', 'section-ht-natural', 'topics', 3, 'en', 'title', 'זווית וכיוון הצמיחה'),
  ('si-ht-nat3-desc-he', 'section-ht-natural', 'topics', 3, 'he', 'description', 'לכל אזור בקרקפת יש זווית וכיוון ייחודיים שבהם השיער גדל. הקפדה על שחזור זוויות אלו בשלב תכנון ההשתלה היא המפתח למראה טבעי.'),
  ('si-ht-nat3-desc-en', 'section-ht-natural', 'topics', 3, 'en', 'description', 'לכל אזור בקרקפת יש זווית וכיוון ייחודיים שבהם השיער גדל. הקפדה על שחזור זוויות אלו בשלב תכנון ההשתלה היא המפתח למראה טבעי.'),
  ('si-ht-nat4-title-he', 'section-ht-natural', 'topics', 4, 'he', 'title', 'הדרגתיות בקו השיער'),
  ('si-ht-nat4-title-en', 'section-ht-natural', 'topics', 4, 'en', 'title', 'הדרגתיות בקו השיער'),
  ('si-ht-nat4-desc-he', 'section-ht-natural', 'topics', 4, 'he', 'description', 'בקו הקדמי מושתלים תחילה זקיקים בודדים, ובהדרגה נוספים זקיקים מרובי שערות. כך מתקבלת מראה "מתמזג" רך וטבעי.'),
  ('si-ht-nat4-desc-en', 'section-ht-natural', 'topics', 4, 'en', 'description', 'בקו הקדמי מושתלים תחילה זקיקים בודדים, ובהדרגה נוספים זקיקים מרובי שערות. כך מתקבלת מראה "מתמזג" רך וטבעי.'),
  ('si-ht-nat5-title-he', 'section-ht-natural', 'topics', 5, 'he', 'title', 'חוסר אחידות טבעית'),
  ('si-ht-nat5-title-en', 'section-ht-natural', 'topics', 5, 'en', 'title', 'חוסר אחידות טבעית'),
  ('si-ht-nat5-desc-he', 'section-ht-natural', 'topics', 5, 'he', 'description', 'השיער אינו גדל בקווים ישרים לחלוטין. יצירת גבולות מעט לא אחידים מדמה את אופן הצמיחה הטבעי ומונעת מראה מלאכותי.'),
  ('si-ht-nat5-desc-en', 'section-ht-natural', 'topics', 5, 'en', 'description', 'השיער אינו גדל בקווים ישרים לחלוטין. יצירת גבולות מעט לא אחידים מדמה את אופן הצמיחה הטבעי ומונעת מראה מלאכותי.');

-- =====================================================
-- 7. hair_transplant_timeline
-- =====================================================
INSERT OR REPLACE INTO page_sections (id, page_id, section_type, sort_order, is_visible)
VALUES ('section-ht-timeline', 'page-hair-transplant', 'hair_transplant_timeline', 8, 1);

INSERT OR REPLACE INTO section_content (id, section_id, field_name, field_type, value_text, language, sort_order) VALUES
  ('sc-ht-tl-title-he', 'section-ht-timeline', 'title', 'text', 'ציר זמן השתלת השיער - מההשתלה לתוצאה הסופית', 'he', 1),
  ('sc-ht-tl-title-en', 'section-ht-timeline', 'title', 'text', 'ציר זמן השתלת השיער - מההשתלה לתוצאה הסופית', 'en', 1),
  ('sc-ht-tl-sub-he', 'section-ht-timeline', 'subtitle', 'text', 'תהליך השבת השיער הוא מסע של כשנה, המתחיל ברגע ההשתלה ומגיע לשיאו בתוצאה הטבעית הסופית. כל שלב בציר הזמן מציג שלב שונה בתהליך הריפוי והצמיחה מחודשת.', 'he', 2),
  ('sc-ht-tl-sub-en', 'section-ht-timeline', 'subtitle', 'text', 'תהליך השבת השיער הוא מסע של כשנה, המתחיל ברגע ההשתלה ומגיע לשיאו בתוצאה הטבעית הסופית. כל שלב בציר הזמן מציג שלב שונה בתהליך הריפוי והצמיחה מחודשת.', 'en', 2),
  ('sc-ht-tl-sidetitle-he', 'section-ht-timeline', 'sidebar_title', 'text', 'הבנה בסיסית של המחזור והנשירה', 'he', 3),
  ('sc-ht-tl-sidetitle-en', 'section-ht-timeline', 'sidebar_title', 'text', 'הבנה בסיסית של המחזור והנשירה', 'en', 3),
  ('sc-ht-tl-sidedesc-he', 'section-ht-timeline', 'sidebar_description', 'text', 'מיד לאחר ההשתלה חלק גדול מהשערות באזור המושתל נכנס למחזור מנוחה ובהמשך לנשירה, תהליך תקין שבו השערות הישנות נושרות כדי לפנות מקום לצמיחה חדשה בזקיקים.', 'he', 4),
  ('sc-ht-tl-sidedesc-en', 'section-ht-timeline', 'sidebar_description', 'text', 'מיד לאחר ההשתלה חלק גדול מהשערות באזור המושתל נכנס למחזור מנוחה ובהמשך לנשירה, תהליך תקין שבו השערות הישנות נושרות כדי לפנות מקום לצמיחה חדשה בזקיקים.', 'en', 4);

-- timeline periods repeater (7 items)
INSERT OR REPLACE INTO section_items (id, section_id, item_group, sort_order, language, field_name, value) VALUES
  ('si-ht-tl1-period-he', 'section-ht-timeline', 'periods', 1, 'he', 'period', 'ימים 0-7'),
  ('si-ht-tl1-period-en', 'section-ht-timeline', 'periods', 1, 'en', 'period', 'ימים 0-7'),
  ('si-ht-tl1-title-he', 'section-ht-timeline', 'periods', 1, 'he', 'title', 'ימים 0–7'),
  ('si-ht-tl1-title-en', 'section-ht-timeline', 'periods', 1, 'en', 'title', 'ימים 0–7'),
  ('si-ht-tl1-desc-he', 'section-ht-timeline', 'periods', 1, 'he', 'description', 'בשבוע הראשון שני האזורים, התורם והמקבל נמצאים בריפוי פעיל. בתקופה זו עשויים להופיע גלדים, גרד קל ולעיתים נקודות דמיות עדינות, כולן תופעות צפויות.'),
  ('si-ht-tl1-desc-en', 'section-ht-timeline', 'periods', 1, 'en', 'description', 'בשבוע הראשון שני האזורים, התורם והמקבל נמצאים בריפוי פעיל. בתקופה זו עשויים להופיע גלדים, גרד קל ולעיתים נקודות דמיות עדינות, כולן תופעות צפויות.'),
  ('si-ht-tl2-period-he', 'section-ht-timeline', 'periods', 2, 'he', 'period', 'שבועיים-3'),
  ('si-ht-tl2-period-en', 'section-ht-timeline', 'periods', 2, 'en', 'period', 'שבועיים-3'),
  ('si-ht-tl2-title-he', 'section-ht-timeline', 'periods', 2, 'he', 'title', 'שבועיים–שלושה שבועות'),
  ('si-ht-tl2-title-en', 'section-ht-timeline', 'periods', 2, 'en', 'title', 'שבועיים–שלושה שבועות'),
  ('si-ht-tl2-desc-he', 'section-ht-timeline', 'periods', 2, 'he', 'description', 'סביב שבועיים הנפיחות בד"כ שוככת, הגלדים ממשיכים לנשור באופן טבעי. עד שבוע שלישי רוב הנפיחות והגלדים כמעט נעלמים, והאדמומיות לאורך קו השיער דועכת בהדרגה.'),
  ('si-ht-tl2-desc-en', 'section-ht-timeline', 'periods', 2, 'en', 'description', 'סביב שבועיים הנפיחות בד"כ שוככת, הגלדים ממשיכים לנשור באופן טבעי. עד שבוע שלישי רוב הנפיחות והגלדים כמעט נעלמים, והאדמומיות לאורך קו השיער דועכת בהדרגה.'),
  ('si-ht-tl3-period-he', 'section-ht-timeline', 'periods', 3, 'he', 'period', 'חודש-חודשיים'),
  ('si-ht-tl3-period-en', 'section-ht-timeline', 'periods', 3, 'en', 'period', 'חודש-חודשיים'),
  ('si-ht-tl3-title-he', 'section-ht-timeline', 'periods', 3, 'he', 'title', 'חודשיים - חודש'),
  ('si-ht-tl3-title-en', 'section-ht-timeline', 'periods', 3, 'en', 'title', 'חודשיים - חודש'),
  ('si-ht-tl3-desc-he', 'section-ht-timeline', 'periods', 3, 'he', 'description', 'סביב חודש מהניתוח יותר ויותר שיערות באזור המושתל נכנסות למנוחה ונושרות, וזהו המנגנון המרכזי שמסביר את "שיא" הנשירה לאחר ההשתלה; באזור התורם השיער כבר מכסה בדרך־כלל את סימני הנטילה.'),
  ('si-ht-tl3-desc-en', 'section-ht-timeline', 'periods', 3, 'en', 'description', 'סביב חודש מהניתוח יותר ויותר שיערות באזור המושתל נכנסות למנוחה ונושרות, וזהו המנגנון המרכזי שמסביר את "שיא" הנשירה לאחר ההשתלה; באזור התורם השיער כבר מכסה בדרך־כלל את סימני הנטילה.'),
  ('si-ht-tl4-period-he', 'section-ht-timeline', 'periods', 4, 'he', 'period', '3-4 חודשים'),
  ('si-ht-tl4-period-en', 'section-ht-timeline', 'periods', 4, 'en', 'period', '3-4 חודשים'),
  ('si-ht-tl4-title-he', 'section-ht-timeline', 'periods', 4, 'he', 'title', 'שלושה–ארבעה חודשים'),
  ('si-ht-tl4-title-en', 'section-ht-timeline', 'periods', 4, 'en', 'title', 'שלושה–ארבעה חודשים'),
  ('si-ht-tl4-desc-he', 'section-ht-timeline', 'periods', 4, 'he', 'description', 'בתחילת החודש השלישי מתחילות להופיע שערות "צעירות"—דקות ובהירות יותר—ולעתים יכולים להופיע פצעונים/פוליקוליטיס קלים סביב זקיקים מתעוררים.'),
  ('si-ht-tl4-desc-en', 'section-ht-timeline', 'periods', 4, 'en', 'description', 'בתחילת החודש השלישי מתחילות להופיע שערות "צעירות"—דקות ובהירות יותר—ולעתים יכולים להופיע פצעונים/פוליקוליטיס קלים סביב זקיקים מתעוררים.'),
  ('si-ht-tl5-period-he', 'section-ht-timeline', 'periods', 5, 'he', 'period', '4-6 חודשים'),
  ('si-ht-tl5-period-en', 'section-ht-timeline', 'periods', 5, 'en', 'period', '4-6 חודשים'),
  ('si-ht-tl5-title-he', 'section-ht-timeline', 'periods', 5, 'he', 'title', 'ארבעה–שישה חודשים'),
  ('si-ht-tl5-title-en', 'section-ht-timeline', 'periods', 5, 'en', 'title', 'ארבעה–שישה חודשים'),
  ('si-ht-tl5-desc-he', 'section-ht-timeline', 'periods', 5, 'he', 'description', 'זהו שלב שבו הצמיחה מורגשת יותר, התעבות הדרגתית ושיער שכבר "אפשר לסרק", אם כי צפיפות ואחידות מלאות טרם הושגו.'),
  ('si-ht-tl5-desc-en', 'section-ht-timeline', 'periods', 5, 'en', 'description', 'זהו שלב שבו הצמיחה מורגשת יותר, התעבות הדרגתית ושיער שכבר "אפשר לסרק", אם כי צפיפות ואחידות מלאות טרם הושגו.'),
  ('si-ht-tl6-period-he', 'section-ht-timeline', 'periods', 6, 'he', 'period', '9-12 חודשים'),
  ('si-ht-tl6-period-en', 'section-ht-timeline', 'periods', 6, 'en', 'period', '9-12 חודשים'),
  ('si-ht-tl6-title-he', 'section-ht-timeline', 'periods', 6, 'he', 'title', 'תשעה–שניים־עשר חודשים'),
  ('si-ht-tl6-title-en', 'section-ht-timeline', 'periods', 6, 'en', 'title', 'תשעה–שניים־עשר חודשים'),
  ('si-ht-tl6-desc-he', 'section-ht-timeline', 'periods', 6, 'he', 'description', 'השיער ממשיך לצמוח בקצב של כ־1–2 ס"מ לחודש, מתעבה ומשתלב במרקם ובצבע עם השיער הקיים, זוהי לרוב ה"קפיצה" שמביאה לתחושת מראה שלם.'),
  ('si-ht-tl6-desc-en', 'section-ht-timeline', 'periods', 6, 'en', 'description', 'השיער ממשיך לצמוח בקצב של כ־1–2 ס"מ לחודש, מתעבה ומשתלב במרקם ובצבע עם השיער הקיים, זוהי לרוב ה"קפיצה" שמביאה לתחושת מראה שלם.'),
  ('si-ht-tl7-period-he', 'section-ht-timeline', 'periods', 7, 'he', 'period', 'שנה-שנה וחצי'),
  ('si-ht-tl7-period-en', 'section-ht-timeline', 'periods', 7, 'en', 'period', 'שנה-שנה וחצי'),
  ('si-ht-tl7-title-he', 'section-ht-timeline', 'periods', 7, 'he', 'title', 'סביב שנה לשנה וחצי'),
  ('si-ht-tl7-title-en', 'section-ht-timeline', 'periods', 7, 'en', 'title', 'סביב שנה לשנה וחצי'),
  ('si-ht-tl7-desc-he', 'section-ht-timeline', 'periods', 7, 'he', 'description', 'בקירוב לשנה לאחר ההשתלה מתקבל לרוב המראה הסופי; כל השערות המושתלות אמורות לחדור את העור, להתכהות ולהתעבות, והתוצאה נראית ומרגישה טבעית לחלוטין.'),
  ('si-ht-tl7-desc-en', 'section-ht-timeline', 'periods', 7, 'en', 'description', 'בקירוב לשנה לאחר ההשתלה מתקבל לרוב המראה הסופי; כל השערות המושתלות אמורות לחדור את העור, להתכהות ולהתעבות, והתוצאה נראית ומרגישה טבעית לחלוטין.');

-- =====================================================
-- 8. hair_transplant_faq
-- =====================================================
INSERT OR REPLACE INTO page_sections (id, page_id, section_type, sort_order, is_visible)
VALUES ('section-ht-faq', 'page-hair-transplant', 'hair_transplant_faq', 9, 1);

INSERT OR REPLACE INTO section_content (id, section_id, field_name, field_type, value_text, language, sort_order) VALUES
  ('sc-ht-faq-title-he', 'section-ht-faq', 'title', 'text', 'שאלות נפוצות על השתלת שיער', 'he', 1),
  ('sc-ht-faq-title-en', 'section-ht-faq', 'title', 'text', 'שאלות נפוצות על השתלת שיער', 'en', 1);

-- faq repeater (19 items)
INSERT OR REPLACE INTO section_items (id, section_id, item_group, sort_order, language, field_name, value) VALUES
  ('si-ht-faq1-q-he', 'section-ht-faq', 'faqs', 1, 'he', 'question', 'מי מתאים להשתלת שיער?'),
  ('si-ht-faq1-q-en', 'section-ht-faq', 'faqs', 1, 'en', 'question', 'מי מתאים להשתלת שיער?'),
  ('si-ht-faq1-a-he', 'section-ht-faq', 'faqs', 1, 'he', 'answer', 'המועמד המתאים הוא מי שיש לו אזור תורם יציב ובריא (לרוב העורף), ושנשירת השיער אינה פעילה בצורה מהירה. בפגישת הייעוץ, ד"ר רימה מבצעת אבחון מקיף הכולל בדיקה קלינית ודרמוסקופית, על מנת להעריך התאמה ולהגדיר ציפיות ריאליות לתוצאה.'),
  ('si-ht-faq1-a-en', 'section-ht-faq', 'faqs', 1, 'en', 'answer', 'המועמד המתאים הוא מי שיש לו אזור תורם יציב ובריא (לרוב העורף), ושנשירת השיער אינה פעילה בצורה מהירה. בפגישת הייעוץ, ד"ר רימה מבצעת אבחון מקיף הכולל בדיקה קלינית ודרמוסקופית, על מנת להעריך התאמה ולהגדיר ציפיות ריאליות לתוצאה.'),
  ('si-ht-faq1-c-he', 'section-ht-faq', 'faqs', 1, 'he', 'category', 'לפני הניתוח'),
  ('si-ht-faq1-c-en', 'section-ht-faq', 'faqs', 1, 'en', 'category', 'לפני הניתוח'),
  ('si-ht-faq2-q-he', 'section-ht-faq', 'faqs', 2, 'he', 'question', 'באילו סוגי נשירה ניתן לטפל באמצעות השתלה?'),
  ('si-ht-faq2-q-en', 'section-ht-faq', 'faqs', 2, 'en', 'question', 'באילו סוגי נשירה ניתן לטפל באמצעות השתלה?'),
  ('si-ht-faq2-a-he', 'section-ht-faq', 'faqs', 2, 'he', 'answer', 'השתלה מתאימה בעיקר לנשירה אנדרוגנטית (תורשתית). במקרים של מחלות דלקתיות או אוטואימוניות בקרקפת, יש צורך קודם לייצב את המצב בעזרת טיפול רפואי.'),
  ('si-ht-faq2-a-en', 'section-ht-faq', 'faqs', 2, 'en', 'answer', 'השתלה מתאימה בעיקר לנשירה אנדרוגנטית (תורשתית). במקרים של מחלות דלקתיות או אוטואימוניות בקרקפת, יש צורך קודם לייצב את המצב בעזרת טיפול רפואי.'),
  ('si-ht-faq2-c-he', 'section-ht-faq', 'faqs', 2, 'he', 'category', 'לפני הניתוח'),
  ('si-ht-faq2-c-en', 'section-ht-faq', 'faqs', 2, 'en', 'category', 'לפני הניתוח'),
  ('si-ht-faq3-q-he', 'section-ht-faq', 'faqs', 3, 'he', 'question', 'האם קיימת מגבלת גיל?'),
  ('si-ht-faq3-q-en', 'section-ht-faq', 'faqs', 3, 'en', 'question', 'האם קיימת מגבלת גיל?'),
  ('si-ht-faq3-a-he', 'section-ht-faq', 'faqs', 3, 'he', 'answer', 'אין גיל מוחלט, אך מומלץ לבצע השתלה כאשר דפוס הנשירה כבר התייצב — לרוב בסוף שנות ה־20.'),
  ('si-ht-faq3-a-en', 'section-ht-faq', 'faqs', 3, 'en', 'answer', 'אין גיל מוחלט, אך מומלץ לבצע השתלה כאשר דפוס הנשירה כבר התייצב — לרוב בסוף שנות ה־20.'),
  ('si-ht-faq3-c-he', 'section-ht-faq', 'faqs', 3, 'he', 'category', 'לפני הניתוח'),
  ('si-ht-faq3-c-en', 'section-ht-faq', 'faqs', 3, 'en', 'category', 'לפני הניתוח'),
  ('si-ht-faq4-q-he', 'section-ht-faq', 'faqs', 4, 'he', 'question', 'מטופלים עם מחלות רקע — האם ניתן לעבור השתלה?'),
  ('si-ht-faq4-q-en', 'section-ht-faq', 'faqs', 4, 'en', 'question', 'מטופלים עם מחלות רקע — האם ניתן לעבור השתלה?'),
  ('si-ht-faq4-a-he', 'section-ht-faq', 'faqs', 4, 'he', 'answer', 'כן, בתנאי שהמחלה מאוזנת. למשל סוכרת מחייבת איזון סוכר תקין והנחיות קדם־ניתוחיות. ההחלטה מתקבלת לאחר הערכה רפואית יסודית עם ד"ר רימה.'),
  ('si-ht-faq4-a-en', 'section-ht-faq', 'faqs', 4, 'en', 'answer', 'כן, בתנאי שהמחלה מאוזנת. למשל סוכרת מחייבת איזון סוכר תקין והנחיות קדם־ניתוחיות. ההחלטה מתקבלת לאחר הערכה רפואית יסודית עם ד"ר רימה.'),
  ('si-ht-faq4-c-he', 'section-ht-faq', 'faqs', 4, 'he', 'category', 'לפני הניתוח'),
  ('si-ht-faq4-c-en', 'section-ht-faq', 'faqs', 4, 'en', 'category', 'לפני הניתוח'),
  ('si-ht-faq5-q-he', 'section-ht-faq', 'faqs', 5, 'he', 'question', 'האם יש צורך לגלח את השיער לפני הניתוח?'),
  ('si-ht-faq5-q-en', 'section-ht-faq', 'faqs', 5, 'en', 'question', 'האם יש צורך לגלח את השיער לפני הניתוח?'),
  ('si-ht-faq5-a-he', 'section-ht-faq', 'faqs', 5, 'he', 'answer', 'ברוב המקרים מומלץ לקצר/לגלח את אזור התורם כדי לאפשר דיוק מקסימלי.'),
  ('si-ht-faq5-a-en', 'section-ht-faq', 'faqs', 5, 'en', 'answer', 'ברוב המקרים מומלץ לקצר/לגלח את אזור התורם כדי לאפשר דיוק מקסימלי.'),
  ('si-ht-faq5-c-he', 'section-ht-faq', 'faqs', 5, 'he', 'category', 'לפני הניתוח'),
  ('si-ht-faq5-c-en', 'section-ht-faq', 'faqs', 5, 'en', 'category', 'לפני הניתוח'),
  ('si-ht-faq6-q-he', 'section-ht-faq', 'faqs', 6, 'he', 'question', 'האם מדובר בפרוצדורה המכוסה ע"י ביטוח?'),
  ('si-ht-faq6-q-en', 'section-ht-faq', 'faqs', 6, 'en', 'question', 'האם מדובר בפרוצדורה המכוסה ע"י ביטוח?'),
  ('si-ht-faq6-a-he', 'section-ht-faq', 'faqs', 6, 'he', 'answer', 'לא. השתלת שיער נחשבת פרוצדורה אסתטית, ולכן התשלום פרטי.'),
  ('si-ht-faq6-a-en', 'section-ht-faq', 'faqs', 6, 'en', 'answer', 'לא. השתלת שיער נחשבת פרוצדורה אסתטית, ולכן התשלום פרטי.'),
  ('si-ht-faq6-c-he', 'section-ht-faq', 'faqs', 6, 'he', 'category', 'לפני הניתוח'),
  ('si-ht-faq6-c-en', 'section-ht-faq', 'faqs', 6, 'en', 'category', 'לפני הניתוח'),
  ('si-ht-faq7-q-he', 'section-ht-faq', 'faqs', 7, 'he', 'question', 'מהי השתלת שיער?'),
  ('si-ht-faq7-q-en', 'section-ht-faq', 'faqs', 7, 'en', 'question', 'מהי השתלת שיער?'),
  ('si-ht-faq7-a-he', 'section-ht-faq', 'faqs', 7, 'he', 'answer', 'הליך מיקרו־כירורגי שבו זקיקי שיער מועברים מאזור תורם לאזורים דלילים או חסרי שיער. העבודה מתבצעת תחת הגדלה אופטית, בדיוק רב, על מנת לשחזר מראה טבעי והרמוני.'),
  ('si-ht-faq7-a-en', 'section-ht-faq', 'faqs', 7, 'en', 'answer', 'הליך מיקרו־כירורגי שבו זקיקי שיער מועברים מאזור תורם לאזורים דלילים או חסרי שיער. העבודה מתבצעת תחת הגדלה אופטית, בדיוק רב, על מנת לשחזר מראה טבעי והרמוני.'),
  ('si-ht-faq7-c-he', 'section-ht-faq', 'faqs', 7, 'he', 'category', 'מהלך הפרוצדורה'),
  ('si-ht-faq7-c-en', 'section-ht-faq', 'faqs', 7, 'en', 'category', 'מהלך הפרוצדורה'),
  ('si-ht-faq8-q-he', 'section-ht-faq', 'faqs', 8, 'he', 'question', 'כמה זמן נמשך הניתוח?'),
  ('si-ht-faq8-q-en', 'section-ht-faq', 'faqs', 8, 'en', 'question', 'כמה זמן נמשך הניתוח?'),
  ('si-ht-faq8-a-he', 'section-ht-faq', 'faqs', 8, 'he', 'answer', 'בדרך כלל 6–8 שעות, בהתאם לכמות הזקיקים. במקרים גדולים, יתואם הליך דו־יומי. לאורך כל ההליך ד"ר רימה נוכחת ומפקחת באופן מלא.'),
  ('si-ht-faq8-a-en', 'section-ht-faq', 'faqs', 8, 'en', 'answer', 'בדרך כלל 6–8 שעות, בהתאם לכמות הזקיקים. במקרים גדולים, יתואם הליך דו־יומי. לאורך כל ההליך ד"ר רימה נוכחת ומפקחת באופן מלא.'),
  ('si-ht-faq8-c-he', 'section-ht-faq', 'faqs', 8, 'he', 'category', 'מהלך הפרוצדורה'),
  ('si-ht-faq8-c-en', 'section-ht-faq', 'faqs', 8, 'en', 'category', 'מהלך הפרוצדורה'),
  ('si-ht-faq9-q-he', 'section-ht-faq', 'faqs', 9, 'he', 'question', 'האם ההליך כואב?'),
  ('si-ht-faq9-q-en', 'section-ht-faq', 'faqs', 9, 'en', 'question', 'האם ההליך כואב?'),
  ('si-ht-faq9-a-he', 'section-ht-faq', 'faqs', 9, 'he', 'answer', 'מבצעים הרדמה מקומית. מרבית המטופלים חשים אי־נוחות קלה בלבד בתחילת ההרדמה. לאחר מכן אין כאב במהלך העבודה.'),
  ('si-ht-faq9-a-en', 'section-ht-faq', 'faqs', 9, 'en', 'answer', 'מבצעים הרדמה מקומית. מרבית המטופלים חשים אי־נוחות קלה בלבד בתחילת ההרדמה. לאחר מכן אין כאב במהלך העבודה.'),
  ('si-ht-faq9-c-he', 'section-ht-faq', 'faqs', 9, 'he', 'category', 'מהלך הפרוצדורה'),
  ('si-ht-faq9-c-en', 'section-ht-faq', 'faqs', 9, 'en', 'category', 'מהלך הפרוצדורה'),
  ('si-ht-faq10-q-he', 'section-ht-faq', 'faqs', 10, 'he', 'question', 'האם נשארות צלקות?'),
  ('si-ht-faq10-q-en', 'section-ht-faq', 'faqs', 10, 'en', 'question', 'האם נשארות צלקות?'),
  ('si-ht-faq10-a-he', 'section-ht-faq', 'faqs', 10, 'he', 'answer', 'בטכניקת FUE נותרות נקודות מיקרוסקופיות זעירות באזור התורם, אשר אינן נראות לעין לאחר ההחלמה.'),
  ('si-ht-faq10-a-en', 'section-ht-faq', 'faqs', 10, 'en', 'answer', 'בטכניקת FUE נותרות נקודות מיקרוסקופיות זעירות באזור התורם, אשר אינן נראות לעין לאחר ההחלמה.'),
  ('si-ht-faq10-c-he', 'section-ht-faq', 'faqs', 10, 'he', 'category', 'מהלך הפרוצדורה'),
  ('si-ht-faq10-c-en', 'section-ht-faq', 'faqs', 10, 'en', 'category', 'מהלך הפרוצדורה'),
  ('si-ht-faq11-q-he', 'section-ht-faq', 'faqs', 11, 'he', 'question', 'האם התוצאה נראית טבעית?'),
  ('si-ht-faq11-q-en', 'section-ht-faq', 'faqs', 11, 'en', 'question', 'האם התוצאה נראית טבעית?'),
  ('si-ht-faq11-a-he', 'section-ht-faq', 'faqs', 11, 'he', 'answer', 'בהחלט — כאשר יש תכנון מדויק של זווית הצמיחה, צפיפות וקו שיער מותאם לפנים. אחד ממרכיבי החתימה של ד"ר רימה הוא קו שיער רך, הרמוני ומאוזן עם מבנה הפנים.'),
  ('si-ht-faq11-a-en', 'section-ht-faq', 'faqs', 11, 'en', 'answer', 'בהחלט — כאשר יש תכנון מדויק של זווית הצמיחה, צפיפות וקו שיער מותאם לפנים. אחד ממרכיבי החתימה של ד"ר רימה הוא קו שיער רך, הרמוני ומאוזן עם מבנה הפנים.'),
  ('si-ht-faq11-c-he', 'section-ht-faq', 'faqs', 11, 'he', 'category', 'מהלך הפרוצדורה'),
  ('si-ht-faq11-c-en', 'section-ht-faq', 'faqs', 11, 'en', 'category', 'מהלך הפרוצדורה'),
  ('si-ht-faq12-q-he', 'section-ht-faq', 'faqs', 12, 'he', 'question', 'האם מדובר בטיפול חד־פעמי?'),
  ('si-ht-faq12-q-en', 'section-ht-faq', 'faqs', 12, 'en', 'question', 'האם מדובר בטיפול חד־פעמי?'),
  ('si-ht-faq12-a-he', 'section-ht-faq', 'faqs', 12, 'he', 'answer', 'תלוי בדפוס הנשירה ושלב ההתפתחות העתידי שלה. בפגישת הייעוץ ד"ר רימה תתווה תכנית לטווח ארוך — כולל מניעה, שימור והשלמות במידת הצורך.'),
  ('si-ht-faq12-a-en', 'section-ht-faq', 'faqs', 12, 'en', 'answer', 'תלוי בדפוס הנשירה ושלב ההתפתחות העתידי שלה. בפגישת הייעוץ ד"ר רימה תתווה תכנית לטווח ארוך — כולל מניעה, שימור והשלמות במידת הצורך.'),
  ('si-ht-faq12-c-he', 'section-ht-faq', 'faqs', 12, 'he', 'category', 'מהלך הפרוצדורה'),
  ('si-ht-faq12-c-en', 'section-ht-faq', 'faqs', 12, 'en', 'category', 'מהלך הפרוצדורה'),
  ('si-ht-faq13-q-he', 'section-ht-faq', 'faqs', 13, 'he', 'question', 'כמה זמן נמשכת ההחלמה?'),
  ('si-ht-faq13-q-en', 'section-ht-faq', 'faqs', 13, 'en', 'question', 'כמה זמן נמשכת ההחלמה?'),
  ('si-ht-faq13-a-he', 'section-ht-faq', 'faqs', 13, 'he', 'answer', 'חזרה לשגרה קלה תוך יומיים־שלושה. החלמה מלאה של האזור לרוב תוך 7–10 ימים.'),
  ('si-ht-faq13-a-en', 'section-ht-faq', 'faqs', 13, 'en', 'answer', 'חזרה לשגרה קלה תוך יומיים־שלושה. החלמה מלאה של האזור לרוב תוך 7–10 ימים.'),
  ('si-ht-faq13-c-he', 'section-ht-faq', 'faqs', 13, 'he', 'category', 'לאחר הניתוח — החלמה וטיפול'),
  ('si-ht-faq13-c-en', 'section-ht-faq', 'faqs', 13, 'en', 'category', 'לאחר הניתוח — החלמה וטיפול'),
  ('si-ht-faq14-q-he', 'section-ht-faq', 'faqs', 14, 'he', 'question', 'האם יש צורך בתרופות לאחר ההשתלה?'),
  ('si-ht-faq14-q-en', 'section-ht-faq', 'faqs', 14, 'en', 'question', 'האם יש צורך בתרופות לאחר ההשתלה?'),
  ('si-ht-faq14-a-he', 'section-ht-faq', 'faqs', 14, 'he', 'answer', 'יינתנו הנחיות ברורות לשטיפה נכונה, שמירה על היגיינת האזור, וטיפול מניעתי. במידת הצורך — גם תמיכה לשיפור צמיחת השיער. ד"ר רימה מלווה באופן אישי בכל שלבי ההחלמה.'),
  ('si-ht-faq14-a-en', 'section-ht-faq', 'faqs', 14, 'en', 'answer', 'יינתנו הנחיות ברורות לשטיפה נכונה, שמירה על היגיינת האזור, וטיפול מניעתי. במידת הצורך — גם תמיכה לשיפור צמיחת השיער. ד"ר רימה מלווה באופן אישי בכל שלבי ההחלמה.'),
  ('si-ht-faq14-c-he', 'section-ht-faq', 'faqs', 14, 'he', 'category', 'לאחר הניתוח — החלמה וטיפול'),
  ('si-ht-faq14-c-en', 'section-ht-faq', 'faqs', 14, 'en', 'category', 'לאחר הניתוח — החלמה וטיפול'),
  ('si-ht-faq15-q-he', 'section-ht-faq', 'faqs', 15, 'he', 'question', 'מדוע השיער המושתל נושר לאחר מספר שבועות?'),
  ('si-ht-faq15-q-en', 'section-ht-faq', 'faqs', 15, 'en', 'question', 'מדוע השיער המושתל נושר לאחר מספר שבועות?'),
  ('si-ht-faq15-a-he', 'section-ht-faq', 'faqs', 15, 'he', 'answer', 'זהו שלב טבעי שנקרא "נשירת הלם". השיער נושר — אך הזקיק נשאר חי. הצמיחה המחודשת מתחילה סביב חודש 3–4.'),
  ('si-ht-faq15-a-en', 'section-ht-faq', 'faqs', 15, 'en', 'answer', 'זהו שלב טבעי שנקרא "נשירת הלם". השיער נושר — אך הזקיק נשאר חי. הצמיחה המחודשת מתחילה סביב חודש 3–4.'),
  ('si-ht-faq15-c-he', 'section-ht-faq', 'faqs', 15, 'he', 'category', 'לאחר הניתוח — החלמה וטיפול'),
  ('si-ht-faq15-c-en', 'section-ht-faq', 'faqs', 15, 'en', 'category', 'לאחר הניתוח — החלמה וטיפול'),
  ('si-ht-faq16-q-he', 'section-ht-faq', 'faqs', 16, 'he', 'question', 'מתי רואים תוצאות מלאות?'),
  ('si-ht-faq16-q-en', 'section-ht-faq', 'faqs', 16, 'en', 'question', 'מתי רואים תוצאות מלאות?'),
  ('si-ht-faq16-a-he', 'section-ht-faq', 'faqs', 16, 'he', 'answer', 'תוצאה ראשונית סביב חודש 4–6. תוצאה מלאה סופית סביב 9–12 חודשים.'),
  ('si-ht-faq16-a-en', 'section-ht-faq', 'faqs', 16, 'en', 'answer', 'תוצאה ראשונית סביב חודש 4–6. תוצאה מלאה סופית סביב 9–12 חודשים.'),
  ('si-ht-faq16-c-he', 'section-ht-faq', 'faqs', 16, 'he', 'category', 'לאחר הניתוח — החלמה וטיפול'),
  ('si-ht-faq16-c-en', 'section-ht-faq', 'faqs', 16, 'en', 'category', 'לאחר הניתוח — החלמה וטיפול'),
  ('si-ht-faq17-q-he', 'section-ht-faq', 'faqs', 17, 'he', 'question', 'פעילות גופנית לאחר השתלה'),
  ('si-ht-faq17-q-en', 'section-ht-faq', 'faqs', 17, 'en', 'question', 'פעילות גופנית לאחר השתלה'),
  ('si-ht-faq17-a-he', 'section-ht-faq', 'faqs', 17, 'he', 'answer', 'מומלץ להימנע ממאמץ, חום וסאונה כשבועיים. הדבר מבטיח איחוי נכון ושמירה על הזקיקים.'),
  ('si-ht-faq17-a-en', 'section-ht-faq', 'faqs', 17, 'en', 'answer', 'מומלץ להימנע ממאמץ, חום וסאונה כשבועיים. הדבר מבטיח איחוי נכון ושמירה על הזקיקים.'),
  ('si-ht-faq17-c-he', 'section-ht-faq', 'faqs', 17, 'he', 'category', 'לאחר הניתוח — החלמה וטיפול'),
  ('si-ht-faq17-c-en', 'section-ht-faq', 'faqs', 17, 'en', 'category', 'לאחר הניתוח — החלמה וטיפול'),
  ('si-ht-faq18-q-he', 'section-ht-faq', 'faqs', 18, 'he', 'question', 'עישון ואלכוהול'),
  ('si-ht-faq18-q-en', 'section-ht-faq', 'faqs', 18, 'en', 'question', 'עישון ואלכוהול'),
  ('si-ht-faq18-a-he', 'section-ht-faq', 'faqs', 18, 'he', 'answer', 'רצוי להימנע בתקופת ההחלמה — הם עלולים לפגוע בזרימת הדם ובהתאוששות הרקמה.'),
  ('si-ht-faq18-a-en', 'section-ht-faq', 'faqs', 18, 'en', 'answer', 'רצוי להימנע בתקופת ההחלמה — הם עלולים לפגוע בזרימת הדם ובהתאוששות הרקמה.'),
  ('si-ht-faq18-c-he', 'section-ht-faq', 'faqs', 18, 'he', 'category', 'לאחר הניתוח — החלמה וטיפול'),
  ('si-ht-faq18-c-en', 'section-ht-faq', 'faqs', 18, 'en', 'category', 'לאחר הניתוח — החלמה וטיפול'),
  ('si-ht-faq19-q-he', 'section-ht-faq', 'faqs', 19, 'he', 'question', 'כיצד לישון בימים הראשונים?'),
  ('si-ht-faq19-q-en', 'section-ht-faq', 'faqs', 19, 'en', 'question', 'כיצד לישון בימים הראשונים?'),
  ('si-ht-faq19-a-he', 'section-ht-faq', 'faqs', 19, 'he', 'answer', 'שינה בתנוחה מוגבהת, עם כרית תומכת, כדי להפחית נפיחות ולמנוע לחץ על האזור.'),
  ('si-ht-faq19-a-en', 'section-ht-faq', 'faqs', 19, 'en', 'answer', 'שינה בתנוחה מוגבהת, עם כרית תומכת, כדי להפחית נפיחות ולמנוע לחץ על האזור.'),
  ('si-ht-faq19-c-he', 'section-ht-faq', 'faqs', 19, 'he', 'category', 'לאחר הניתוח — החלמה וטיפול'),
  ('si-ht-faq19-c-en', 'section-ht-faq', 'faqs', 19, 'en', 'category', 'לאחר הניתוח — החלמה וטיפול');

-- =====================================================
-- Cache version
-- =====================================================
INSERT OR REPLACE INTO cache_versions (entity_type, entity_id, version, updated_at)
VALUES ('page', 'hair-transplant', 1, datetime('now'));
