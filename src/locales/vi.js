import { s } from "framer-motion/client";
import { int } from "three/tsl";

const vi = {
  // Navigation
  nav: {
    home: "Trang chủ",
    whyProject: "Lý do dự án",
    goals: "Mục tiêu",
    activities: "Hoạt động",
    experience: "Trải nghiệm",
  },

  // Hero Section
  hero: {
    title: "Triết học 4.0",
    subtitle: "Tư duy biên giới AI",
    description: "Khám phá triết học Mác-Lênin trong kỷ nguyên trí tuệ nhân tạo",
    startTour: "Bắt đầu Audio Tour",
    learnMore: "Tìm hiểu thêm",
  },

  // Why Project Page
  whyProject: {
    title: "Vì sao có dự án này?",
    subtitle: "Lý do ra đời",
    backHome: "← Về Trang Chủ",
    audioTourNote: "🎵 Audio tour available on main page",
    intro: "Trong kỷ nguyên AI, chúng ta cần tái khám phá triết học Mác-Lênin",
    challenge: {
      title: "Thách Thức Của Thời Đại",
      paragraph1: "Trong kỷ nguyên công nghệ 4.0, chúng ta đang chứng kiến sự phát triển vượt bậc của trí tuệ nhân tạo. Tuy nhiên, triết học - nền tảng của tư duy con người - vẫn chưa theo kịp tốc độ phát triển này.",
      paragraph2: "Philosophy 4.0 ra đời để giải quyết khoảng cách này, tạo ra một cầu nối giữa tư duy truyền thống và công nghệ hiện đại.",
    },
    vision: {
      title: "Tầm Nhìn Tương Lai",
      paragraph1: "Chúng tôi tin rằng tương lai thuộc về những ai có thể kết hợp được tư duy triết học sâu sắc với khả năng ứng dụng công nghệ AI một cách thông minh.",
      paragraph2: "Philosophy 4.0 không chỉ là một dự án công nghệ, mà là một phong trào tư duy mới, nơi mà trí tuệ nhân tạo và trí tuệ con người cùng phát triển và bổ trợ lẫn nhau.",
    },
    differences: {
      title: "Điểm Khác Biệt",
      innovation: {
        title: "Đổi Mới",
        description: "Kết hợp triết học cổ điển với công nghệ AI tiên tiến nhất",
      },
      practical: {
        title: "Ứng Dụng",
        description: "Không chỉ lý thuyết mà còn có giá trị thực tiễn cao",
      },
      community: {
        title: "Cộng Đồng",
        description: "Xây dựng cộng đồng học tập và nghiên cứu toàn cầu",
      },
    },
    cta: {
      title: "Sẵn Sàng Tham Gia Cuộc Cách Mạng Tư Duy?",
      description: "Hãy cùng chúng tôi khám phá tương lai của triết học trong kỷ nguyên AI",
      learnGoals: "Tìm Hiểu Mục Tiêu",
      exploreActivities: "Khám Phá Hoạt Động",
      backToHome: "Về Trang Chủ",
    },
    reason1: {
      title: "Tư duy phê phán",
      description: "Phát triển khả năng phân tích và đánh giá hiện thực xã hội một cách sâu sắc",
    },
    reason2: {
      title: "Thích nghi công nghệ",
      description: "Ứng dụng triết học vào việc hiểu và định hướng sự phát triển của AI",
    },
    reason3: {
      title: "Giá trị nhân văn",
      description: "Giữ vững bản chất con người trong thời đại số hóa",
    },
  },

  // Goals Page
  goals: {
    title: "Mục Tiêu Triết 4.0",
    pageTitle: "Mục Tiêu Triết 4.0",
    subtitle: "Định hướng phát triển",
    audioTourNote: "🎵 Audio tour available on main page",
    backHome: "← Về Trang Chủ",
    timeline: {
      title: "Lộ Trình Phát Triển",
      subtitle: "Hành trình tiến hóa của triết học trong kỷ nguyên AI",
    },
    phase1: {
      title: "Giai Đoạn 1",
      name: "Xây Dựng Nền Tảng",
      description: "Phát triển framework cơ bản kết hợp triết học cổ điển với AI. Tạo ra những công cụ đầu tiên để hỗ trợ tư duy triết học.",
    },
    phase2: {
      title: "Giai Đoạn 2",
      name: "Phát Triển Ứng Dụng",
      description: "Tạo ra các ứng dụng thực tế của Philosophy 4.0 trong giáo dục, nghiên cứu và đời sống hàng ngày.",
    },
    phase3: {
      title: "Giai Đoạn 3",
      name: "Mở Rộng Cộng Đồng",
      description: "Xây dựng cộng đồng toàn cầu các nhà triết học, nhà phát triển AI và những người quan tâm đến tương lai của tư duy.",
    },
    phase4: {
      title: "Giai Đoạn 4",
      name: "Hội Nhập Toàn Cầu",
      description: "Đưa Philosophy 4.0 trở thành chuẩn mực trong giáo dục triết học và phát triển AI có trách nhiệm.",
    },
    keyFeatures: {
      title: "Điểm Nổi Bật",
      feature1: {
        title: "Học Tập Tương Tác",
        description: "Phương pháp học tập chủ động với AI assistant",
      },
      feature2: {
        title: "Cộng Đồng Toàn Cầu",
        description: "Kết nối với các nhà tư tưởng trên thế giới",
      },
      feature3: {
        title: "Nghiên Cứu Tiên Tiến",
        description: "Tiếp cận các nghiên cứu mới nhất về AI ethics",
      },
    },
    cta: {
      title: "Hãy Là Phần Của Cuộc Cách Mạng",
      description: "Cùng nhau xây dựng tương lai nơi AI và triết học cùng phát triển",
      whyNow: "Tại Sao Ngay Bây Giờ?",
      joinActivities: "Tham Gia Hoạt Động",
      exploreActivities: "Khám Phá Hoạt Động",
      backHome: "Về Trang Chủ",
    },
    goal1: {
      title: "Giáo dục hiện đại",
      description: "Đổi mới phương pháp giảng dạy triết học phù hợp với thế hệ trẻ",
    },
    goal2: {
      title: "Tương tác sáng tạo",
      description: "Kết hợp công nghệ và gamification để học tập trở nên thú vị",
    },
    goal3: {
      title: "Cộng đồng học tập",
      description: "Xây dựng môi trường học tập mở và hợp tác",
    },
    coreObjectives:{
      title: "Mục Tiêu Cốt Lõi",
      aiIntegration:{
        title: "Tích Hợp AI",
        description: "Kết hợp trí tuệ nhân tạo để nâng cao trải nghiệm học tập và nghiên cứu triết học",
      },
      education:{
        title: "Cải Tiến Giáo Dục",
        description: "Đổi mới phương pháp giảng dạy triết học phù hợp với thế hệ trẻ",
      },
      research:{
        title: "Nghiên Cứu Tiên Tiến",
        description: "Thúc đẩy nghiên cứu về AI ethics và các vấn đề triết học hiện đại",
      },
      community:{
        title: "Xây Dựng Cộng Đồng",
        description: "Tạo ra một mạng lưới toàn cầu các nhà triết học, nhà phát triển AI và những người quan tâm đến tư duy",
      },
      application:{
        title: "Ứng Dụng Thực Tiễn",
        description: "Phát triển các công cụ và ứng dụng thực tế dựa trên triết học Mác-Lênin trong kỷ nguyên AI",
      },
      future:{
        title: "Định Hướng Tương Lai",
        description: "Định hình tương lai của triết học trong bối cảnh công nghệ số và AI",
      },
    }
  },

  // Activities Page
  activities: {
    title: "Minigame & Hoạt Động",
    pageTitle: "Minigame & Hoạt Động",
    subtitle: "Trải nghiệm tương tác",
    audioTourNote: "🎵 Audio tour available on main page",
    backHome: "← Về Trang Chủ",
    intro: "Trải nghiệm bốn mini-game tương tác được thiết kế dựa trên các chủ đề lý thuyết chính của Triết học Mác-Lênin trong kỷ nguyên AI. Mỗi trò chơi kết hợp nhập vai, mô phỏng và câu đố để giúp bạn hiểu sâu hơn về các khái niệm triết học thông qua thực hành.",
    mainTitle: "Bốn Mini-Game Tương Tác",
    mainSubtitle: "Học Triết học Mác-Lênin qua trải nghiệm tương tác và mô phỏng",
    playNow: "Chơi Ngay",
    learnMore: "Tìm Hiểu Thêm",
    game1: {
      name: "Mâu thuẫn 4.0",
      subtitle: "Xung đột Lực lượng Sản xuất AI và Quan hệ Sản xuất",
      title: "Mâu thuẫn biện chứng",
      description: "Nhập vai nhà cố vấn thời gian du hành qua các giai đoạn lịch sử. Điều chỉnh quan hệ sản xuất cho phù hợp với sự xuất hiện của AI để tránh cách mạng xã hội.",
      type: "Chiến lược",
      difficulty: "Trung bình",
      features: {
        interactive: "Lựa chọn tương tác",
        multiple: "Nhiều kết cục",
        mentor: "Mentor Mác hướng dẫn"
      }
    },
    game2: {
      name: "Thợ săn Giá trị Thặng dư",
      subtitle: "Bóc lột Lao động trong Kỷ nguyên AI",
      title: "Giá trị thặng dư",
      description: "Vào vai nhà tư bản điều hành nhà máy. Cân bằng giữa việc bóc lột công nhân và đầu tư Robot AI để tối đa hóa giá trị thặng dư mà không gây đình công.",
      type: "Mô phỏng",
      difficulty: "Khó",
      features: {
        resource: "Quản lý tài nguyên",
        balance: "Cân bằng chiến lược",
        points: "Hệ thống điểm"
      }
    },
    game3: {
      name: "AI và Đấu tranh Giai cấp 4.0",
      subtitle: "Lợi ích Tư bản Công nghệ vs. Lao động Số",
      title: "Đấu tranh giai cấp",
      description: "Trải nghiệm cả hai góc nhìn giai cấp: Tư bản công nghệ và Lao động số. Hiểu rõ sự khác biệt về lợi ích kinh tế trong thời đại AI.",
      type: "Nhập vai",
      difficulty: "Khó",
      features: {
        dual: "Hai chế độ chơi",
        random: "Sự kiện ngẫu nhiên",
        compare: "So sánh kết quả"
      }
    },
    game4: {
      name: "Thử tài Sáng tạo: Người hay Máy?",
      subtitle: "Ranh giới giữa Sáng tạo Nhân văn và Trí tuệ Nhân tạo",
      title: "Kiểm tra sáng tạo",
      description: "Phân biệt tác phẩm do con người và AI tạo ra. Khám phá ranh giới giữa sự sáng tạo của con người và sản phẩm AI qua tranh, thơ, nhạc và code.",
      type: "Trắc nghiệm",
      difficulty: "Dễ",
      features: {
        diverse: "Đa dạng lĩnh vực",
        gemini: "Gemini AI",
        turing: "Trợ lý Turing"
      }
    },
    game5:{
      name: "Trí Nhớ Biện Chứng",
      subtitle: "Ghép triết gia với tư tưởng bất hủ",
      description:"Một mini game lật thẻ nơi bạn thử thách trí nhớ bằng cách ghép hình ảnh các triết gia với tên của họ. Càng nhớ đúng nhiều cặp, bạn càng hiểu rõ hơn về họ.",
      type: "Trí nhớ",
      difficulty: "Trung Bình",
      features: {
        flip: "Lật thẻ",
        match: "Ghép cặp",
        timer: "Đếm thời gian"
      }
    },
    game6:{
      name:"The Cave - Thuyết Ẩn Dụ Hang Động",
      subtitle: "Hành trình từ Bóng tối đến Ánh sáng",
      description: "Nhập vai một tù nhân bị giam trong hang động của Plato. Khởi đầu bạn chỉ thấy những chiếc bóng, nhưng qua từng bước bạn sẽ khám phá ngọn lửa, thoát khỏi xiềng xích, và cuối cùng bước ra ánh sáng chân lý. Một trải nghiệm triết học tương tác, nơi bạn trực tiếp cảm nhận hành trình nhận thức từ ảo tưởng đến sự thật.",
      type: "Nhập vai",
      difficulty: "Dễ",
      features: {
        mode: "Hai chế độ chơi",
        event: "Sự kiện ngẫu nhiên",
        compare: "So sánh kết quả"
      }
    },
    additionalSection: {
      title: "Hoạt Động Cộng Đồng",
      subtitle: "Kết nối và chia sẻ cùng cộng đồng",
      workshop: "Workshop Online",
      discussion: "Thảo Luận Nhóm",
      competition: "Cuộc Thi Sáng Tạo",
    },
    cta: {
      title: "Sẵn Sàng Thử Thách?",
      subtitle: "Trải nghiệm cách học Triết học Mác-Lênin hoàn toàn mới thông qua các mini-game tương tác với công nghệ AI",
      viewGoals: "Xem Mục Tiêu",
      experience: "Trải Nghiệm",
      backHome: "Về Trang Chủ",
      description: "Khám phá triết học qua minigame và trở thành Philosophy 4.0 master!",
      startJourney: "Bắt Đầu Hành Trình",

    },
    aboutGames:{
      title: "Về Các Mini-Game",
      note: "Mỗi mini-game được thiết kế dựa trên nội dung học thuật Triết học Mác-Lênin, kết hợp bối cảnh AI hiện đại. Vừa giải trí vừa hiểu sâu khái niệm triết học qua trải nghiệm tương tác.",
      learningMethod:{
        title: "Phương Pháp Học Tập",
        point1: "Học qua trải nghiệm: Mỗi trò chơi được thiết kế để bạn học thông qua việc tham gia trực tiếp vào các tình huống mô phỏng.",
        point2: "Tương tác và phản hồi: Các trò chơi cung cấp lựa chọn tương tác và phản hồi ngay lập tức.", 
        point3: "Đa dạng thể loại: Từ chiến lược, mô phỏng đến nhập vai và trắc nghiệm.",
        point4: "Hướng dẫn chuyên sâu: Mỗi trò chơi đều có sự hỗ trợ từ các mentor và tài liệu tham khảo.",
      },
      knowledgeGained:{
        title: "Kiến Thức Đạt Được",
        point1: "Hiểu biết sâu sắc về triết học Mác-Lênin: Qua các trò chơi, bạn sẽ nắm vững các khái niệm cốt lõi như mâu thuẫn biện chứng, giá trị thặng dư, đấu tranh giai cấp và sáng tạo trong bối cảnh AI.",
        point2: "Khả năng phân tích và tư duy phản biện: Các tình huống mô phỏng yêu cầu bạn phải phân tích, đánh giá và đưa ra quyết định dựa trên các nguyên lý triết học.",
        point3: "Ứng dụng triết học vào thực tiễn: Bạn sẽ học cách áp dụng các nguyên lý triết học vào các tình huống thực tế.",
        point4: "Kỹ năng giải quyết vấn đề: Mỗi trò chơi đều đặt bạn vào các tình huống thách thức, giúp rèn luyện kỹ năng giải quyết vấn đề.",
      }
    }
  },

  // Experience Page
  experience: {
    title: "Kỳ Vọng & Trải Nghiệm",
    introText: "Khám phá những trải nghiệm thực tế từ cộng đồng người dùng và hiểu rõ những gì bạn có thể kỳ vọng khi tham gia vào hệ sinh thái Philosophy 4.0.",
    pageTitle: "Kỳ Vọng & Trải Nghiệm",
    subtitle: "Hành trình khám phá",
    audioTourNote: "🎵 Audio tour available on main page",
    backHome: "← Về Trang Chủ",
    expectation1: "Trải nghiệm học tập tương tác và thú vị",
    expectation2: "Hiểu sâu về triết học Mác-Lênin",
    expectation3: "Phát triển tư duy phê phán",
    expectation4: "Kết nối với cộng đồng học tập",
    expectations: {
      title: "Những Gì Bạn Sẽ Đạt Được",
      subtitle: "Phát triển toàn diện cả kiến thức và kỹ năng",
      proficiency: "Độ thành thạo",
      criticalThinking: {
        title: "Tư Duy Phản Biện",
        description: "Phát triển khả năng phân tích và đánh giá thông tin một cách có hệ thống",
      },
      problemSolving: {
        title: "Giải Quyết Vấn Đề",
        description: "Áp dụng các nguyên lý triết học để giải quyết vấn đề thực tế",
      },
      aiEthics: {
        title: "Hiểu Biết AI Ethics",
        description: "Nắm vững các vấn đề đạo đức trong phát triển và ứng dụng AI",
      },
      communication: {
        title: "Kỹ Năng Giao Tiếp",
        description: "Trình bày và thảo luận các ý tưởng phức tạp một cách rõ ràng",
      },
    },
    testimonials: {
      title: "Cảm Nhận Từ Cộng Đồng",
      subtitle: "Những trải nghiệm thực tế từ người dùng",
      student: "Sinh viên Triết học",
      lecturer: "Giảng viên Đại học",
      engineer: "Kỹ sư AI",
      researcher: "Nhà nghiên cứu",
    },
    learningPath: {
      title: "Lộ Trình Học Tập",
      subtitle: "Từ người mới đến chuyên gia",
      mainActivities: "Hoạt động chính",
      explore: {
        phase: "Khám Phá",
        duration: "Tuần 1-2",
        description: "Làm quen với Philosophy 4.0 và các khái niệm cơ bản",
        activities:{
          activity1 :"Minigame logic",
          activity2 :"Video giới thiệu",
          activity3 :"Bài test đánh giá"
        }
      },
      develop: {
        phase: "Phát Triển",
        duration: "Tuần 3-8",
        description: "Phát triển kỹ năng thông qua các hoạt động tương tác",
        activities: {
          activity1 :"Workshop nhóm",
          activity2 :"Thảo luận AI ethics",
          activity3 :"Dự án cá nhân"
        }
      },
      apply: {
        phase: "Ứng Dụng",
        duration: "Tuần 9-12",
        description: "Áp dụng kiến thức vào các tình huống thực tế",
        activities: {
          activity1 :"Case study",
          activity2 :"Mô phỏng quyết định",
          activity3 :"Presentation"
        }
      },
      master: {
        phase: "Thành Thạo",
        duration: "Tuần 13+",
        description: "Trở thành mentor và đóng góp cho cộng đồng",
        activities: {
          activity1 :"Hướng dẫn newbie",
          activity2 :"Tạo nội dung",
          activity3 :"Nghiên cứu"
        }
      },
    },
    cta: {
      title: "Bắt Đầu Hành Trình Của Bạn",
      subtitle: "Khám phá tiềm năng của bạn với Philosophy 4.0",
      description: "Tham gia cộng đồng Philosophy 4.0 ngay hôm nay và khám phá tiềm năng của bạn",
      joinCommunity: "Tham Gia Cộng Đồng",
      startLearning: "Bắt Đầu Học",
      backHome: "Về Trang Chủ",
      exploreActivities: "Khám Phá Hoạt Động",
      viewGoals: "Xem Mục Tiêu",
    },
  },

  // Footer
  footer: {
    hashtag: "#PHILOSOPHY4.0",
    contact: "Liên hệ",
    privacy: "Chính sách bảo mật",
    followUs: "Theo dõi chúng tôi",
    copyright: "Copyright © 2025 Philosophy 4.0 - All Rights Reserved",
    philosophy: "Philosophy 4.0",
    aiClub: "AI Club",
    philosophyAI: "Triết học AI",
    thinking: "Tư duy 4.0",
    community: "Cộng đồng",
    contactUs: "Liên hệ",
    philosophyTalk: "Philosophy Talk",
    joinText: "Tham gia cộng đồng Philosophy 4.0 để được cập nhật những breakthrough mới nhất về AI edge và triết học, cùng các sự kiện học tập thú vị!",
    emailPlaceholder: "Nhập email của bạn",
    privacyPolicy: "Chính sách bảo mật",
    terms: "Điều khoản sử dụng",
  },

  // Common
  common: {
    loading: "Đang tải...",
    error: "Đã xảy ra lỗi",
    retry: "Thử lại",
    close: "Đóng",
    next: "Tiếp theo",
    previous: "Trước",
    submit: "Gửi",
    cancel: "Hủy",
    confirm: "Xác nhận",
    play: "Phát",
    pause: "Tạm dừng",
    startGame: "Bắt Đầu",
    backToMenu: "Về Menu",
    score: "Điểm",
    level: "Cấp độ",
    time: "Thời gian",
    features: "Đặc điểm",
    difficulty: "Độ khó",
    type: "Loại",
  },

  // Benefit Section
  benefit: {
    intro: "Khám phá những lợi ích vượt trội:",
    subtitle: "Tại sao nên chọn Triết 4.0 cho tương lai tư duy",
    title1: "Đổi mới AI",
    title2: "Triết 4.0",
    title3: "Tư duy tương lai",
    title4: "Trí tuệ vô hạn",
    moreText: "Và nhiều hơn thế nữa...",
    benefits: {
      innovation: "Đổi mới AI",
      futureThinking: "Tư duy tương lai",
      smartPhilosophy: "Triết học thông minh",
      infiniteWisdom: "Trí tuệ vô hạn",
    },
  },

  // Hall Section
  hall: {
    title: "Đại Sảnh Triết Học",
    intro1: "Hãy bước vào",
    intro2: "Đại Sảnh Triết Học",
    intro3: "— nơi vinh danh những tư tưởng gia vĩ đại đã định hình dòng chảy của tri thức nhân loại.",
    description1: "Từ",
    plato: "Plato",
    aristotle: "Aristotle",
    descartes: "Descartes",
    description2: "cho đến",
    nietzsche: "Nietzsche",
    description3: "và",
    marx: "Marx",
    description4: "— mỗi triết gia đều để lại dấu ấn riêng, truyền cảm hứng cho những thế hệ đi sau.",
    swipeInstruction: "Hãy lướt qua từng thẻ để khám phá cuộc đời, tư tưởng và di sản bất hủ của họ.",
  },

  // Message Section
  message: {
    firstMessage: "Vì sao cần có dự án",
    highlight: "Triết 4.0",
    secondMessage: "trong kỷ nguyên AI và công nghệ số",
    content: "Triết học cần tiến hóa cùng với công nghệ. Triết 4.0 là cầu nối giữa trí tuệ nhân tạo và tư duy triết học, mở ra những khả năng vô hạn cho tương lai.",
  },

  // Flavor Section
  flavor: {
    title1: "Philosophy 4.0 có",
    title2: "6 nguyên tắc",
    title3: "cốt lõi AI",
    flavors: {
      philosophy40: "Triết học 4.0",
      aiConsciousness: "AI Consciousness",
      digitalWisdom: "Digital Wisdom",
      neuralPhilosophy: "Neural Philosophy",
      edgeComputing: "Edge Computing",
      futureThinking: "Future Thinking",
    },
    descriptions: {
      desc0: "Khởi nguồn của triết học trong kỷ nguyên số",
      desc1: "Ý thức nhân tạo và tự nhận thức",
      desc2: "Trí tuệ số hoá cho tương lai",
      desc3: "Triết học thông qua mạng neural",
      desc4: "Tính toán biên cho tư duy nhanh",
      desc5: "Tư duy tiên phong cho thế hệ mới",
    },
  },

  // Timeline Section
  timeline: {
    title: "Sự Phát Triển Lực Lượng Sản Xuất",
    subtitle: "Từ công cụ thô sơ đến trí tuệ nhân tạo - Hành trình tiến hóa của nhân loại",
    prehistoric: {
      period: "Tiền Sử",
      title: "Công Cụ Thô Sơ",
      subtitle: "Lao động thủ công",
      description: "Bàn tay con người cầm cuốc, đào đất. Năng suất lao động: Rất thấp, phụ thuộc hoàn toàn vào sức người. Tác động xã hội: Cộng đồng bộ lạc, tự cung tự cấp.",
      productivity: "Rất thấp",
      impact: "Cộng đồng bộ lạc",
    },
    industrial1: {
      period: "1760-1840",
      title: "Cách Mạng Công Nghiệp 1.0",
      subtitle: "Máy móc cơ khí",
      description: "Máy hơi nước, máy dệt cơ khí. Năng suất lao động: Tăng 10-20 lần so với thủ công. Tác động xã hội: Hình thành giai cấp công nhân, đô thị hóa bùng nổ, xã hội chuyển từ nông nghiệp sang công nghiệp.",
      productivity: "Tăng 10-20 lần",
      impact: "Đô thị hóa, giai cấp công nhân",
    },
    industrial2: {
      period: "1870-1914",
      title: "Cách Mạng Công Nghiệp 2.0",
      subtitle: "Dây chuyền điện khí hóa",
      description: "Dây chuyền sản xuất hàng loạt, động cơ điện. Năng suất lao động: Tăng gấp đôi so với 1.0 nhờ chuyên môn hóa. Tác động xã hội: Sản xuất hàng loạt, tiêu chuẩn hóa sản phẩm, tăng trưởng kinh tế nhanh chóng.",
      productivity: "Tăng gấp đôi",
      impact: "Sản xuất hàng loạt",
    },
    industrial3: {
      period: "1969-Nay",
      title: "Cách Mạng Công Nghiệp 3.0",
      subtitle: "Máy tính & Tự động hóa",
      description: "Máy tính, robot công nghiệp, internet. Năng suất lao động: Tăng 50-100 lần nhờ tự động hóa quy trình. Tác động xã hội: Toàn cầu hóa, kinh tế tri thức, giảm việc làm sản xuất.",
      productivity: "Tăng 50-100 lần",
      impact: "Toàn cầu hóa, kinh tế tri thức",
    },
    industrial4: {
      period: "2010-Tương Lai",
      title: "Cách Mạng Công Nghiệp 4.0",
      subtitle: "AI, Robot, Big Data",
      description: "Trí tuệ nhân tạo, IoT, robot thông minh, phân tích dữ liệu lớn. Năng suất lao động: Tăng đột biến, gấp hàng trăm lần trong một số ngành. Tác động xã hội: Nguy cơ thất nghiệp công nghệ cao, tái cấu trúc lao động, xuất hiện nghề nghiệp mới.",
      productivity: "Tăng đột biến (x100-1000)",
      impact: "⚠️ Thất nghiệp công nghệ",
    },
    cta: {
      challengeTitle: "Thách Thức Của Kỷ Nguyên 4.0",
      challengeDesc: "Năng suất tăng đột biến, nhưng đi kèm là nguy cơ thất nghiệp công nghệ.",
      challengeHumanRole: "Triết học 4.0 giúp chúng ta tái định nghĩa vai trò con người trong xã hội mới."
    }
  },

  // Constants
  constants: {
    cards: {
      drTriet: "Dr. Triết",
      philosophy40: "Philosophy 4.0",
      trietAIMaster: "TrietAI Master",
      aiPhilosopher: "AI Philosopher",
      digitalWisdom: "Digital Wisdom",
      futureMind: "Future Mind",
      edgeIntelligence: "Edge Intelligence",
    },
    nutrients: {
      intelligence: "Intelligence",
      innovation: "Innovation",
      wisdom: "Wisdom",
      edgeAI: "Edge AI",
      future: "Future",
    },
  },

  // Philosophy Section
  philosophy: {
    title: "Các nhà triết học vĩ đại",
    subtitle: "Kế thừa và phát triển",
  },

  // Philosophers Cards
  philosophers: {
    socrates: {
      title: "Socrates Philosophiæ",
      description: "Socrates (470 TCN – 399 TCN) được xem là một trong những nhà triết học vĩ đại và có ảnh hưởng nhất trong lịch sử triết học phương Tây. Ông không để lại bất kỳ tác phẩm viết nào, nhưng qua những ghi chép từ các học trò như Plato và Xenophon, tư tưởng và phương pháp của Socrates đã trở thành nền tảng cho triết học hiện đại.",
    },
    plato: {
      title: "Plato Philosophiæ",
      description: "Plato (427 TCN – 347 TCN) là một trong những nhà triết học vĩ đại nhất của lịch sử phương Tây, nổi bật với những đóng góp sâu sắc vào nền triết học lý tưởng và chính trị học. Ông là học trò của Socrates và thầy của Aristotle, góp phần định hình hệ tư tưởng triết học qua các tác phẩm mang tầm ảnh hưởng suốt hàng ngàn năm.",
    },
    aristotle: {
      title: "Aristotles Philosophiæ",
      description: "Aristotles (384 TCN – 322 TCN) là một trong những nhà triết học vĩ đại nhất trong lịch sử nhân loại, nổi bật với tư duy toàn diện và hệ thống tri thức sâu rộng. Là học trò xuất sắc của Plato, ông không chỉ kế thừa mà còn phát triển triết học theo hướng thực tế và khoa học, tạo nên nền móng cho nhiều lĩnh vực từ logic, đạo đức, chính trị đến khoa học tự nhiên.",
    },
    confucius: {
      title: "Khổng Tử",
      description: "Khổng Tử (551 TCN – 479 TCN) là một trong những nhà triết học vĩ đại nhất của Trung Quốc, nổi bật với những tư tưởng về đạo đức, chính trị và giáo dục. Ông đã sáng lập ra Nho giáo, một hệ thống tư tưởng có ảnh hưởng sâu rộng đến văn hóa và xã hội Trung Quốc cũng như nhiều nước châu Á khác.",
    },
    kant: {
      title: "Immanuel Kant",
      description: "Immanuel Kant (1724 – 1804) là một trong những nhà triết học vĩ đại nhất của thế kỷ 18, nổi bật với những đóng góp sâu sắc vào triết học đạo đức và nhận thức luận. Ông đã phát triển thuyết duy nghiệm và lý thuyết về đạo đức dựa trên nguyên tắc phổ quát, ảnh hưởng lớn đến triết học hiện đại và các lĩnh vực khác như chính trị và nghệ thuật.",
    },
    pythagoras: {
      title: "Pythagoras Philosophiæ",
      description: "Pythagoras (c. 570 – c. 495 TCN) là một trong những nhà triết học và nhà toán học vĩ đại nhất của thế giới cổ đại, nổi tiếng với những đóng góp quan trọng cho hình học và triết học. Ông đã sáng lập ra một trường phái triết học dựa trên các nguyên tắc toán học và âm nhạc, ảnh hưởng lớn đến tư tưởng phương Tây.",
    },
    descartes: {
      title: "René Descartes",
      description: "René Descartes (1596 – 1650) là một trong những nhà triết học và toán học vĩ đại nhất của thời kỳ Khai sáng, nổi tiếng với câu nói 'Tôi tư duy, vậy tôi tồn tại'. Ông đã đặt nền móng cho triết học hiện đại thông qua phương pháp hoài nghi và phân tích.",
    },
    beauvoir: {
      title: "Simone de Beauvoir",
      description: "Simone de Beauvoir (1908 – 1986) là một trong những nhà triết học và nhà văn nổi bật của thế kỷ 20, được biết đến với những đóng góp quan trọng cho triết học hiện sinh và nữ quyền. Tác phẩm nổi tiếng nhất của bà, 'The Second Sex', đã đặt ra những câu hỏi sâu sắc về bản chất của giới tính và vai trò của phụ nữ trong xã hội.",
    },
    nietzsche: {
      title: "Friedrich Nietzsche",
      description: "Friedrich Nietzsche (1844 – 1900) là một trong những nhà triết học vĩ đại nhất của thế kỷ 19, nổi bật với những tư tưởng về siêu nhân, ý chí mạnh mẽ và sự phản kháng đối với các giá trị truyền thống. Ông đã đặt ra những câu hỏi sâu sắc về bản chất của con người, đạo đức và sự tồn tại.",
    },
    marx: {
      title: "Karl Marx",
      description: "Karl Marx (1818 – 1883) là một trong những nhà triết học và nhà kinh tế học vĩ đại nhất của thế kỷ 19, nổi tiếng với những phân tích sâu sắc về xã hội, kinh tế và chính trị. Ông đã phát triển lý thuyết về chủ nghĩa duy vật biện chứng và phê phán chủ nghĩa tư bản, ảnh hưởng lớn đến nhiều phong trào chính trị và xã hội trên toàn thế giới.",
    },
  },

  // Quote Section
  quote: {
    marxQuote: "Các nhà triết học chỉ giải thích thế giới theo nhiều cách khác nhau, vấn đề là phải thay đổi nó.",
    author: "Karl Marx",
  },
};

export default vi;
