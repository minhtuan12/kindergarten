import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, TrendingUp, MessageCircle, Settings, Star, Utensils, Users, BookOpen, Heart, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function ParentDashboard({ 
  onBack, 
  stars = 0, 
  emotionHistory = [],
  speak
}: { 
  onBack: () => void, 
  stars?: number,
  emotionHistory?: {emotion: string, date: string, feedback: string}[],
  speak: (text: string) => void
}) {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'nutrition' | 'community' | 'teacher' | 'emotions'>('overview');
  const [communityPosts, setCommunityPosts] = useState<Array<{
    _id: string;
    parentName: string;
    content: string;
    createdAt?: string;
  }>>([]);
  const [isCommunityLoading, setIsCommunityLoading] = useState(false);
  const [communityError, setCommunityError] = useState<string | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [parentNameInput, setParentNameInput] = useState('');
  const [questionInput, setQuestionInput] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [teacherMessages, setTeacherMessages] = useState<Array<{
    _id: string;
    parentName: string;
    studentName: string;
    content: string;
    createdAt?: string;
  }>>([]);
  const [teacherParentNameInput, setTeacherParentNameInput] = useState('');
  const [teacherStudentNameInput, setTeacherStudentNameInput] = useState('');
  const [teacherMessageInput, setTeacherMessageInput] = useState('');
  const [isTeacherLoading, setIsTeacherLoading] = useState(false);
  const [isTeacherPosting, setIsTeacherPosting] = useState(false);
  const [teacherError, setTeacherError] = useState<string | null>(null);

  const nutritionMenu = [
    { day: 'Thứ 2', breakfast: 'Cháo yến mạch sữa tươi', lunch: 'Cơm, cá hồi kho, canh bí đỏ', snack: 'Sữa chua trái cây', cal: 1200 },
    { day: 'Thứ 3', breakfast: 'Bánh mì kẹp trứng', lunch: 'Cơm, thịt heo luộc, canh rau ngót', snack: 'Nước cam ép', cal: 1150 },
    { day: 'Thứ 4', breakfast: 'Phở bò', lunch: 'Cơm, tôm rim, canh mướp đắng', snack: 'Chuối chín', cal: 1250 },
    { day: 'Thứ 5', breakfast: 'Súp gà ngô ngọt', lunch: 'Cơm, đậu phụ sốt cà chua, canh cải', snack: 'Váng sữa', cal: 1180 },
    { day: 'Thứ 6', breakfast: 'Bún mọc', lunch: 'Cơm, gà chiên nước mắm, canh bí xanh', snack: 'Táo', cal: 1220 },
  ];

  const suggestedNutritionPlans = [
    {
      title: 'Tăng đề kháng',
      icon: '🛡️',
      breakfast: 'Cháo cá hồi, bí đỏ',
      lunch: 'Cơm, thịt bò xào bông cải, canh rau ngót',
      snack: 'Cam tươi + sữa chua',
      note: 'Giàu vitamin C, sắt và kẽm'
    },
    {
      title: 'Hỗ trợ tăng chiều cao',
      icon: '📏',
      breakfast: 'Bún mọc + sữa ít đường',
      lunch: 'Cơm, tôm rim, canh cải nấu thịt',
      snack: 'Phô mai + chuối',
      note: 'Bổ sung canxi, đạm và vitamin D'
    },
    {
      title: 'Nhẹ bụng, dễ tiêu',
      icon: '🌿',
      breakfast: 'Súp gà ngô ngọt',
      lunch: 'Cơm mềm, đậu phụ sốt cà, canh bí xanh',
      snack: 'Táo hấp hoặc lê chín',
      note: 'Ít dầu mỡ, phù hợp ngày bé mệt'
    },
  ];

  const fetchCommunityPosts = async () => {
    setIsCommunityLoading(true);
    setCommunityError(null);

    try {
      const response = await fetch('/api/community-posts');
      if (!response.ok) {
        throw new Error('Không tải được dữ liệu cộng đồng.');
      }
      const posts = await response.json();
      setCommunityPosts(posts);
    } catch (error) {
      setCommunityError('Không thể tải bài viết cộng đồng. Vui lòng thử lại.');
    } finally {
      setIsCommunityLoading(false);
    }
  };

  useEffect(() => {
    if (activeSubTab === 'community') {
      fetchCommunityPosts();
    }
  }, [activeSubTab]);

  const fetchTeacherMessages = async () => {
    setIsTeacherLoading(true);
    setTeacherError(null);
    try {
      const response = await fetch('/api/teacher-messages');
      if (!response.ok) {
        throw new Error('Không tải được tin nhắn cho giáo viên.');
      }
      const messages = await response.json();
      setTeacherMessages(messages);
    } catch (error) {
      setTeacherError('Không thể tải tin nhắn. Vui lòng thử lại.');
    } finally {
      setIsTeacherLoading(false);
    }
  };

  useEffect(() => {
    if (activeSubTab === 'teacher') {
      fetchTeacherMessages();
    }
  }, [activeSubTab]);

  const handleCreatePost = async () => {
    if (!parentNameInput.trim() || !questionInput.trim()) {
      setCommunityError('Vui lòng nhập tên phụ huynh và nội dung câu hỏi.');
      return;
    }

    setIsPosting(true);
    setCommunityError(null);
    try {
      const response = await fetch('/api/community-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: parentNameInput.trim(),
          content: questionInput.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Đăng câu hỏi thất bại.');
      }

      const post = await response.json();
      setCommunityPosts((prev) => [post, ...prev]);
      setIsPostModalOpen(false);
      setParentNameInput('');
      setQuestionInput('');
      speak('Đăng câu hỏi thành công');
    } catch (error) {
      setCommunityError('Đăng câu hỏi thất bại. Vui lòng thử lại.');
    } finally {
      setIsPosting(false);
    }
  };

  const handleSendTeacherMessage = async () => {
    if (!teacherParentNameInput.trim() || !teacherStudentNameInput.trim() || !teacherMessageInput.trim()) {
      setTeacherError('Vui lòng nhập tên phụ huynh, tên học sinh và nội dung tin nhắn.');
      return;
    }

    setIsTeacherPosting(true);
    setTeacherError(null);
    try {
      const response = await fetch('/api/teacher-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: teacherParentNameInput.trim(),
          studentName: teacherStudentNameInput.trim(),
          content: teacherMessageInput.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Gửi tin nhắn thất bại.');
      }

      const message = await response.json();
      setTeacherMessages((prev) => [message, ...prev]);
      setTeacherMessageInput('');
      speak('Đã gửi tin nhắn cho giáo viên');
    } catch (error) {
      setTeacherError('Gửi tin nhắn thất bại. Vui lòng thử lại.');
    } finally {
      setIsTeacherPosting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="h-full w-full flex flex-col bg-slate-50 overflow-y-auto"
    >
      <div className="flex items-center justify-between p-6 bg-white shadow-sm sticky top-0 z-10">
        <Button variant="outline" size="icon" onClick={() => {
          onBack();
          speak("Quay lại");
        }} className="rounded-full">
          <ArrowLeft size={24} />
        </Button>
        <h2 className="text-2xl font-black text-slate-700">Phụ Huynh</h2>
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => speak("Cài đặt")}>
          <Settings size={24} />
        </Button>
      </div>

      {/* Sub-tabs Navigation */}
      <div className="flex bg-white px-6 py-2 border-b overflow-x-auto no-scrollbar gap-4 sticky top-[80px] z-10">
        {[
          { id: 'overview', label: 'Tổng quan', icon: <TrendingUp size={18} /> },
          { id: 'nutrition', label: 'Dinh dưỡng', icon: <Utensils size={18} /> },
          { id: 'community', label: 'Cộng đồng', icon: <Users size={18} /> },
          { id: 'emotions', label: 'Cảm xúc', icon: <Heart size={18} /> },
          { id: 'teacher', label: 'Góc tâm sự', icon: <MessageCircle size={18} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveSubTab(tab.id as any);
              speak(tab.label);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${activeSubTab === tab.id ? 'bg-sky-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6 flex flex-col gap-6 pb-24">
        <AnimatePresence mode="wait">
          {activeSubTab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6">
                  <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center text-sky-500">
                    <Clock size={32} />
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium">Thời gian học hôm nay</p>
                    <h3 className="text-3xl font-black text-slate-800">45 <span className="text-xl font-bold text-slate-400">phút</span></h3>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-500">
                    <Star size={32} className="fill-yellow-500" />
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium">Ngôi sao bé đạt được</p>
                    <h3 className="text-3xl font-black text-slate-800">{stars} <span className="text-xl font-bold text-slate-400">sao</span></h3>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="text-emerald-500" />
                  <h3 className="text-xl font-bold text-slate-700">Tiến độ học tập</h3>
                </div>
                
                <div className="flex flex-col gap-4">
                  {[
                    { label: 'Học chữ', progress: 80, color: 'bg-sky-500' },
                    { label: 'Học số', progress: 65, color: 'bg-yellow-500' },
                    { label: 'Sáng tạo', progress: 90, color: 'bg-emerald-500' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm font-medium text-slate-600 mb-2">
                        <span>{item.label}</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full ${item.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeSubTab === 'nutrition' && (
            <motion.div key="nutrition" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2">
                  <Utensils className="text-orange-500" /> Thực đơn dinh dưỡng tuần này
                </h3>
                <div className="flex flex-col gap-4">
                  {nutritionMenu.map((item) => (
                    <div key={item.day} className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-black text-orange-800">{item.day}</span>
                        <span className="text-sm font-bold text-orange-600 bg-white px-3 py-1 rounded-full shadow-sm">{item.cal} kcal</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                        <p><span className="font-bold">Sáng:</span> {item.breakfast}</p>
                        <p><span className="font-bold">Trưa:</span> {item.lunch}</p>
                        <p><span className="font-bold">Phụ:</span> {item.snack}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2">
                  <BookOpen className="text-emerald-500" /> Gợi ý thực đơn theo mục tiêu
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {suggestedNutritionPlans.map((plan) => (
                    <div key={plan.title} className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">{plan.icon}</span>
                        <h4 className="font-black text-emerald-800">{plan.title}</h4>
                      </div>
                      <div className="text-sm text-slate-700 space-y-1">
                        <p><span className="font-bold">Sáng:</span> {plan.breakfast}</p>
                        <p><span className="font-bold">Trưa:</span> {plan.lunch}</p>
                        <p><span className="font-bold">Phụ:</span> {plan.snack}</p>
                      </div>
                      <p className="mt-3 text-xs font-bold text-emerald-700 bg-white/80 rounded-xl px-3 py-2 border border-emerald-100">
                        {plan.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeSubTab === 'community' && (
            <motion.div key="community" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2">
                  <Users className="text-sky-500" /> Cộng đồng Cha mẹ thông thái
                </h3>
                <div className="flex flex-col gap-4">
                  {isCommunityLoading && (
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-slate-500 font-bold text-center">
                      Đang tải bài viết cộng đồng...
                    </div>
                  )}
                  {!isCommunityLoading && communityPosts.map((post) => (
                    <div key={post._id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-sky-200 rounded-full flex items-center justify-center text-xs font-bold text-sky-700">
                          {post.parentName[0]}
                        </div>
                        <span className="font-bold text-slate-700">{post.parentName}</span>
                      </div>
                      <p className="text-slate-600 mb-2">{post.content}</p>
                      <div className="text-xs font-bold text-slate-400">
                        {post.createdAt ? new Date(post.createdAt).toLocaleString('vi-VN') : ''}
                      </div>
                    </div>
                  ))}
                  {!isCommunityLoading && communityPosts.length === 0 && (
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-slate-500 font-bold text-center">
                      Chưa có câu hỏi nào. Hãy là người đầu tiên đăng câu hỏi mới.
                    </div>
                  )}
                  {communityError && (
                    <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 text-rose-600 font-bold text-sm">
                      {communityError}
                    </div>
                  )}
                  <Button
                    onClick={() => {
                      setCommunityError(null);
                      setIsPostModalOpen(true);
                    }}
                    className="w-full rounded-2xl py-6 text-lg font-black bg-sky-500 hover:bg-sky-600"
                  >
                    Đăng câu hỏi mới
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {activeSubTab === 'emotions' && (
            <motion.div key="emotions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2">
                  <Heart className="text-rose-500" /> Nhật ký cảm xúc của bé
                </h3>
                
                {emotionHistory.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {emotionHistory.map((record, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">
                              {record.emotion === 'vui' ? '😊' : record.emotion === 'buon' ? '😢' : '😠'}
                            </span>
                            <span className="font-bold text-slate-700 capitalize">
                              {record.emotion === 'vui' ? 'Vui vẻ' : record.emotion === 'buon' ? 'Buồn bã' : 'Tức giận'}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-slate-400">
                            {new Date(record.date).toLocaleDateString('vi-VN')} {new Date(record.date).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 italic">"{record.feedback}"</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <span className="text-6xl mb-4 block">🌈</span>
                    <p className="text-slate-500 font-bold">Bé chưa ghi lại cảm xúc nào hôm nay.</p>
                  </div>
                )}
              </div>

              {emotionHistory.length > 0 && (
                <div className="bg-gradient-to-br from-sky-500 to-blue-600 p-6 rounded-3xl shadow-lg text-white">
                  <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                    <TrendingUp /> Phân tích từ AI
                  </h3>
                  <p className="font-bold opacity-90 leading-relaxed">
                    Dựa trên lịch sử cảm xúc, bé đang có trạng thái tâm lý khá ổn định. 
                    {emotionHistory.filter(r => r.emotion === 'vui').length > emotionHistory.length / 2 
                      ? " Bé thường xuyên cảm thấy vui vẻ khi học tập. Đây là dấu hiệu rất tốt!" 
                      : " Bé có một vài khoảnh khắc chưa vui, phụ huynh hãy dành thêm thời gian trò chuyện cùng bé nhé."}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {activeSubTab === 'teacher' && (
            <motion.div key="teacher" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2">
                  <MessageCircle className="text-purple-500" /> Góc tâm sự cùng cô
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={teacherParentNameInput}
                      onChange={(e) => setTeacherParentNameInput(e.target.value)}
                      placeholder="Tên phụ huynh"
                      className="w-full bg-slate-100 rounded-full px-6 py-3 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <input
                      type="text"
                      value={teacherStudentNameInput}
                      onChange={(e) => setTeacherStudentNameInput(e.target.value)}
                      placeholder="Tên học sinh"
                      className="w-full bg-slate-100 rounded-full px-6 py-3 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <div className="flex gap-2">
                    <textarea
                      value={teacherMessageInput}
                      onChange={(e) => setTeacherMessageInput(e.target.value)}
                      placeholder="Nhắn tin cho cô..."
                      rows={3}
                      className="flex-1 bg-slate-100 rounded-3xl px-6 py-3 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                    />
                    <Button
                      size="icon"
                      className="rounded-full bg-purple-500 hover:bg-purple-600"
                      onClick={handleSendTeacherMessage}
                      disabled={isTeacherPosting}
                    >
                      <Send size={20} />
                    </Button>
                  </div>

                  {teacherError && (
                    <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 text-rose-600 font-bold text-sm">
                      {teacherError}
                    </div>
                  )}

                  {isTeacherLoading && (
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-slate-500 font-bold text-center">
                      Đang tải tin nhắn...
                    </div>
                  )}

                  {!isTeacherLoading && teacherMessages.map((message) => (
                    <div key={message._id} className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
                      <div className="flex flex-wrap gap-2 items-center mb-2">
                        <span className="font-black text-purple-800">{message.parentName}</span>
                        <span className="text-slate-400">·</span>
                        <span className="font-bold text-purple-700">Bé: {message.studentName}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{message.content}</p>
                      <p className="text-xs text-slate-400 mt-2 font-medium">
                        {message.createdAt ? new Date(message.createdAt).toLocaleString('vi-VN') : ''}
                      </p>
                    </div>
                  ))}

                  {!isTeacherLoading && teacherMessages.length === 0 && (
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-slate-500 font-bold text-center">
                      Chưa có tin nhắn nào gửi cho giáo viên.
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isPostModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-slate-100 p-6 flex flex-col gap-4"
            >
              <h3 className="text-2xl font-black text-slate-800">Đăng câu hỏi mới</h3>
              <input
                type="text"
                value={parentNameInput}
                onChange={(e) => setParentNameInput(e.target.value)}
                placeholder="Tên phụ huynh"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              <textarea
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
                placeholder="Nhập nội dung câu hỏi của bạn..."
                rows={5}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
              />
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsPostModalOpen(false)}
                  className="rounded-2xl"
                  disabled={isPosting}
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleCreatePost}
                  className="rounded-2xl bg-sky-500 hover:bg-sky-600"
                  disabled={isPosting}
                >
                  {isPosting ? 'Đang đăng...' : 'Đăng câu hỏi'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
