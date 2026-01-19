import { UserProfile, WeeklySchedule } from './types';

export const USER_PROFILE: UserProfile = {
  name: "精英 01号",
  stats: {
    height: "163cm",
    weight: "65kg",
    bench: "100kg",
    squat: "135kg",
    deadlift: "160kg"
  },
  injuries: ["L4-L5 腰椎劳损", "C5-C6 颈椎膨出"]
};

// Common Warmup/Cooldown definitions
const WARMUP_ROUTINE = [
  { id: "wu1", name: "肩部环绕", sets: "2", reps: "20次", notes: "大幅度绕肩，活动关节囊", restTime: "0" },
  { id: "wu2", name: "弹力带面拉", sets: "2", reps: "15次", notes: "激活后束，轻重量", restTime: "30" },
  { id: "wu3", name: "猫牛式", sets: "1", reps: "1分钟", notes: "脊柱分节运动，配合呼吸", restTime: "0" }
];

const COOLDOWN_ROUTINE = [
  { id: "cd1", name: "胸大肌拉伸", sets: "1", reps: "30秒/侧", notes: "靠墙拉伸，不要过度", restTime: "0" },
  { id: "cd2", name: "背部泡沫轴", sets: "1", reps: "1分钟", notes: "滚动胸椎段，避开腰椎", restTime: "0" }
];

export const WEEKLY_PLAN: WeeklySchedule = {
  1: { // Monday
    dayName: "星期一",
    focus: "上肢肌肥大 & 颈椎控制",
    theme: 'strength',
    warning: "C5-C6 重点关注",
    warmup: WARMUP_ROUTINE,
    exercises: [
      { 
        id: "m1", 
        name: "平板卧推", 
        sets: "4", 
        reps: "5-8", 
        targetWeight: "82.5", 
        targetReps: "6", 
        notes: "与潘德勒划船组成超级组",
        restTime: "120-180",
        formCheck: [
          "保持肩胛骨后缩下沉，保护 C5-C6 颈椎。",
          "脚掌死死抓地，创造稳定的全身张力。",
          "杠铃下放到乳头位置，肘部不要过分外展。"
        ]
      },
      { 
        id: "m2", 
        name: "潘德勒划船", 
        sets: "4", 
        reps: "8-10", 
        targetWeight: "70", 
        targetReps: "8", 
        notes: "爆发力拉起，慢速下放",
        restTime: "60-90",
        formCheck: [
          "躯干几乎与地面平行，保持腰椎中立。",
          "不要用惯性‘荡’起重量，感受背阔肌收缩。"
        ]
      },
      { 
        id: "m3", 
        name: "面拉", 
        sets: "3", 
        reps: "15", 
        targetWeight: "RPE 8", 
        targetReps: "15", 
        notes: "针对C5-C6康复。挤压后束。",
        restTime: "60-90",
        formCheck: [
          "绳索调至眼部高度，向两侧耳朵方向拉。",
          "重点感受后三角肌挤压，不要耸肩（避免斜方肌过载）。",
          "C5-C6 Patch: 保持下巴微收，颈部不要前伸。"
        ]
      },
      { 
        id: "m4", 
        name: "RKC 平板支撑", 
        sets: "4", 
        reps: "45秒", 
        targetWeight: "自重", 
        targetReps: "45s", 
        notes: "最大张力。收紧臀部。",
        restTime: "45-60",
        formCheck: [
          "全身极度收紧：握拳、夹紧臀部、大腿用力。",
          "想象要把手肘和脚尖往身体中间“拉”。",
          "保持呼吸，但不要松开腹部的张力。"
        ]
      }
    ],
    cooldown: COOLDOWN_ROUTINE,
    coachNote: "C5-C6 重点关注：收下巴，大重量组避免颈部代偿。不要在卧推时探头。"
  },
  2: { // Tuesday
    dayName: "星期二",
    focus: "下肢极限力量 (Max Effort)",
    theme: 'strength',
    warning: "腰椎保护协议生效",
    warmup: [{ id: "t_wu1", name: "90/90 髋关节灵活性", sets: "1", reps: "2分钟", notes: "激活髋部" }],
    exercises: [
      { 
        id: "t1", 
        name: "低杠深蹲", 
        sets: "3", 
        reps: "3-5", 
        targetWeight: "107.5", 
        targetReps: "5", 
        restTime: "180-240",
        notes: "必须佩戴腰带。强制使用瓦式呼吸。",
        formCheck: [
          "核心吸气锁死（腹内压），像穿了钢盔一样。",
          "膝盖与脚尖方向一致，重心始终在足底中心。",
          "起身时臀部与胸部同步上升，避免“早安式”蹲起伤腰。"
        ]
      },
      { 
        id: "t2", 
        name: "传统硬拉", 
        sets: "3", 
        reps: "3", 
        targetWeight: "135", 
        targetReps: "3", 
        restTime: "180-240",
        notes: "保持脊柱绝对中立。禁止龟背磨次数。",
        formCheck: [
          "脊柱保持中立，严禁圆腰。",
          "杠铃始终贴着腿部滑动，缩短力臂。",
          "L4-L5 Protection: 动作全程通过臀部伸展发力，不要用腰去“吊”重量。"
        ]
      },
      { 
        id: "t3", 
        name: "保加利亚分腿蹲", 
        sets: "3", 
        reps: "8/单腿", 
        targetWeight: "RPE 8", 
        targetReps: "8", 
        restTime: "90",
        notes: "针对灵活性与稳定性的辅助训练。" 
      }
    ],
    cooldown: [{ id: "t_cd1", name: "臀部拉伸", sets: "1", reps: "2分钟", notes: "鸽子式" }],
    coachNote: "腰椎保护协议：深呼吸，核心绷紧。严禁盲目冲大重量 (NO EGO LIFTING)。"
  },
  3: { // Wednesday
    dayName: "星期三",
    focus: "主动恢复 - 有氧二区",
    theme: 'cardio',
    exercises: [
      { id: "w1", name: "自由泳", sets: "1", reps: "45分钟", targetWeight: "Z2", targetReps: "45m", notes: "持续心率二区。注重延展度。" },
      { id: "w2", name: "胸椎灵活性", sets: "1", reps: "10分钟", targetWeight: "自重", targetReps: "10m", notes: "泡沫轴放松 & 伸展。" }
    ],
    coachNote: "排酸日。今天流畅的运动有助于脊柱减压。"
  },
  4: { // Thursday
    dayName: "星期四",
    focus: "系统重启 & 筋膜放松",
    theme: 'zen', // Special Zen mode
    exercises: [
      { id: "th1", name: "深层组织按摩", sets: "1", reps: "60分钟", targetWeight: "放松", targetReps: "60m", notes: "重点放松腰方肌 (QL) 和斜方肌。", isRest: true }
    ],
    coachNote: "系统重启中... 专注于筋膜松解 (Fascia Release)。"
  },
  5: { // Friday
    dayName: "星期五",
    focus: "核心爆发 & 神经系统激活",
    theme: 'strength',
    warmup: [{ id: "f_wu1", name: "跳箱", sets: "3", reps: "5次", notes: "激活神经" }],
    exercises: [
      { 
        id: "f1", 
        name: "农夫行走", 
        sets: "4", 
        reps: "30米", 
        targetWeight: "RPE 9", 
        targetReps: "30m", 
        restTime: "90-120",
        notes: "大重量。抗侧屈训练。",
        formCheck: [
          "保持躯干正直，不要因为负重而侧倾，这是锻炼深层核心稳定性的关键。",
          "沉肩，不要耸肩，像拎着两个沉重的行李箱。"
        ]
      },
      { id: "f2", name: "帕洛夫推", sets: "3", reps: "10/单侧", targetWeight: "RPE 8", targetReps: "10", restTime: "60", notes: "抗旋转。锁死核心。" },
      { id: "f3", name: "跳绳", sets: "5", reps: "3分钟", targetWeight: "极速", targetReps: "3m", restTime: "60", notes: "泰拳节奏预备。" }
    ],
    cooldown: [{ id: "f_cd1", name: "小腿拉伸", sets: "1", reps: "2分钟", notes: "防抽筋" }],
    coachNote: "激活中枢神经系统 (CNS)。核心要硬，脚步要轻。"
  },
  6: { // Saturday
    dayName: "星期六",
    focus: "技能 & 高强度间歇",
    theme: 'skill',
    exercises: [
      { id: "s1", name: "泰拳课", sets: "1", reps: "90分钟", targetWeight: "技术", targetReps: "90m", notes: "打靶 & 实战模拟。" },
      { id: "s2", name: "颈部等长收缩", sets: "3", reps: "20秒", targetWeight: "手阻", targetReps: "20s", notes: "缠抱后的颈部安全加固。" }
    ],
    coachNote: "释放野性，但保持技术。内围缠抱时注意颈椎安全。"
  },
  0: { // Sunday
    dayName: "星期日",
    focus: "动态休息 & 减压",
    theme: 'rest',
    exercises: [
      { id: "su1", name: "网球", sets: "1", reps: "60分钟", targetWeight: "休闲", targetReps: "60m", notes: "休闲对打。侧向移动练习。" },
      { id: "su2", name: "脊柱减压拉伸", sets: "1", reps: "20分钟", targetWeight: "自重", targetReps: "20m", notes: "单杠悬垂，脊柱波浪运动。" }
    ],
    coachNote: "重置日。为明天的大重量推举做好心理准备。"
  }
};