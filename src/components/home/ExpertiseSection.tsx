import { GradientCategoryHeader } from "../../utils/GradientCategoryHeader";

export function ExpertiseSection() {
  return (
    <section className="min-h-screen bg-white flex items-center justify-center hebrew-text py-12 lg:py-0" style={{ padding: '48px 0', margin: '0' }}>
      <div className="w-full">
        {/* אלמנט מרכזי */}
        <div className="w-full" style={{ margin: '0', padding: '0' }}>
          <GradientCategoryHeader 
            title="המומחיות והמחויבות שלי"
          >
            <div className="text-center w-full mx-auto space-y-4 px-6 lg:px-32" style={{ padding: '0 40px', maxWidth: '100%' }}>
              <p className="text-lg leading-relaxed">
                בקליניקה שלי אני משלבת בין רפואה מתקדמת, דיוק כירורגי ויחס אישי אמיתי. <br className="hidden lg:block" />
                החזית הטיפולית שלנו כוללת השתלות שיער בטכנולוגיות המובילות, רפואת עור מקצועית ברמה הגבוהה ביותר וטיפולים אסתטיים חדשניים <br className="hidden lg:block" />
                אך מעל הכול נמצא הקשר הישיר והאנושי בינינו.
              </p>

              {/* שתי עמודות תוכן */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 text-right px-2 lg:px-20 pb-16">
                {/* עמודה ימנית - ייעוץ אבחוני */}
                <div className="space-y-4 lg:border lg:border-white/20 lg:rounded-xl lg:p-6">
                  <h3 className="text-2xl font-semibold border border-white/20 rounded-lg p-4 lg:border-0 lg:border-b lg:rounded-none lg:p-0 lg:pb-4">
                    ייעוץ אבחוני אמיתי<br />
                    בלי מתווכים, רק אני ואת/ה 
                  </h3>
                  
                  <p className="text-lg leading-relaxed">
                    כל מטופל ומטופלת נפגשים איתי באופן אישי.
                    אין אצלנו "יועצים" ו"משווקים" או גורמים שאינם רפואיים.
                  </p>

                  <p className="font-semibold">בפגישת האבחון נבצע יחד:</p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-[#905e26] mb-2">אבחון מקצועי ומעמיק</h4>
                      <p className="text-lg leading-relaxed">
                        בדיקה קלינית ודרמטסוקופית מדויקת של מצב השיער, העור והצרכים האסתטיים.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#905e26] mb-2">שקיפות מלאה והסבר ברור</h4>
                      <p className="text-lg leading-relaxed">
                        אציג בפנייך את כל אפשרויות הטיפול — השתלות שיער, טיפולי שיער מתקדמים, רפואת עור, אסתטיקה — כולל יתרונות, חסרונות, תוצאות צפויות ועלויות.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#905e26] mb-2">המלצה אובייקטיבית שמותאמת אישית</h4>
                      <p className="text-lg leading-relaxed">
                        נבחר יחד את הפתרון המדויק ביותר, זה שיביא לשיפור טבעי, מחמיא וממשך.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#905e26] mb-2">כנות מקצועית ללא פשרות</h4>
                      <p className="text-lg leading-relaxed">
                        אם טיפול אינו נחוץ, או אם הפער בין הציפיות לתוצאה עלול להיות גדול — אומר זאת בצורה ברורה ומכבדת.
                        האחריות שלי היא להוביל אותך לתוצאה טובה, לא למכור טיפול.
                      </p>
                    </div>
                  </div>
                </div>

                {/* עמודה שמאלית - ליווי אישי */}
                <div className="space-y-4 lg:border lg:border-white/20 lg:rounded-xl lg:p-6">
                  <h3 className="text-2xl font-semibold border border-white/20 rounded-lg p-4 lg:border-0 lg:border-b lg:rounded-none lg:p-0 lg:pb-4">
                    יד ביד לאורך כל הדרך<br />
                    ליווי אישי, רציף ומרגיע
                  </h3>
                  
                  <p className="text-lg leading-relaxed">
                    הדרך שלך לשיער מלא יותר, לעור בריא יותר או למראה רענן יותר אינה מסתיימת ביום הטיפול.
                    אני מלווה אותך אישית, שלב אחר שלב:
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-[#905e26] mb-2">לפני הטיפול</h4>
                      <p className="text-lg leading-relaxed">
                        הסבר מלא, מענה לכל שאלה, בניית תכנית מותאמת אישית בהתאם למטרות ולציפיות שלך.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#905e26] mb-2">במהלך הטיפול</h4>
                      <p className="text-lg leading-relaxed">
                        ביצוע מקצועי, זהיר ומדויק — תוך שמירה על סטנדרט רפואי גבוה וסביבה בטוחה ונעימה.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#905e26] mb-2">אחרי הטיפול</h4>
                      <p className="text-lg leading-relaxed">
                        מעקב אישי, הנחיות ברורות וזמינות מלאה לכל צורך — כדי שתעברי את התהליך בשקט נפשי ותקבלי תוצאה מושלמת.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GradientCategoryHeader>
        </div>
      </div>
    </section>
  );
}