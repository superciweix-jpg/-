import { UserProfile, WeeklySchedule } from './types';

export const USER_PROFILE: UserProfile = {
  name: "程宪",
  stats: {
    height: "165cm",
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
    focus: "上肢肌肥大 (Chest & Back)",
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
        restTime: "60-90"
      },
      { 
        id: "m4", 
        name: "RKC 平板支撑", 
        sets: "4", 
        reps: "45秒", 
        targetWeight: "自重", 
        targetReps: "45s", 
        notes: "最大张力。收紧臀部。",
        restTime: "45-60"
      }
    ],
    cooldown: COOLDOWN_ROUTINE,
    coachNote: "C5-C6 重点关注：收下巴，大重量组避免颈部代偿。不要在卧推时探头。"
  },
  2: { // Tuesday
    dayName: "星期二",
    focus: "主动恢复 (Active Recovery)",
    theme: 'rest',
    exercises: [
      { id: "tu1", name: "低强度有氧", sets: "1", reps: "45分钟", targetWeight: "Z1-Z2", targetReps: "45m", notes: "快走或爬坡，保持心率在120-130。" },
      { id: "tu2", name: "全身静态拉伸", sets: "1", reps: "20分钟", targetWeight: "放松", targetReps: "20m", notes: "重点针对胸大肌和髋屈肌。" }
    ],
    coachNote: "休息也是训练的一部分。今天专注于血液循环和组织恢复。"
  },
  3: { // Wednesday
    dayName: "星期三",
    focus: "下肢力量 (Leg Day)",
    theme: 'strength',
    warning: "腰椎保护协议生效",
    warmup: [{ id: "w_wu1", name: "90/90 髋关节灵活性", sets: "1", reps: "2分钟", notes: "激活髋部" }],
    exercises: [
      { 
        id: "w1", 
        name: "深蹲", 
        sets: "5", 
        reps: "5", 
        targetWeight: "100", 
        targetReps: "5", 
        restTime: "180",
        notes: "专注于动作质量，膝盖对准脚尖。" 
      },
      { 
        id: "w2", 
        name: "罗马尼亚硬拉", 
        sets: "4", 
        reps: "8-10", 
        targetWeight: "90", 
        targetReps: "8", 
        restTime: "120",
        notes: "感受大腿后侧拉伸，保持背部挺直。" 
      }
    ],
    cooldown: [{ id: "w_cd1", name: "泡沫轴放松", sets: "1", reps: "10分钟", notes: "大腿前侧与外侧" }],
    coachNote: "下肢训练对中枢神经消耗较大，组间休息要充分。"
  },
  4: { // Thursday
    dayName: "星期四",
    focus: "完全休息 (Rest)",
    theme: 'zen',
    exercises: [
      { id: "th1", name: "冥想与呼吸", sets: "1", reps: "15分钟", targetWeight: "无", targetReps: "15m", notes: "清空杂念，关注呼吸节奏。", isRest: true }
    ],
    coachNote: "系统重启中... 专注于睡眠质量。"
  },
  5: { // Friday
    dayName: "星期五",
    focus: "肩臂专项 (Shoulders & Arms)",
    theme: 'strength',
    exercises: [
      { id: "f1", name: "站姿哑铃推举", sets: "4", reps: "8-12", targetWeight: "RPE 8", targetReps: "10", restTime: "90", notes: "核心收紧，避免腰椎反弓。" },
      { id: "f2", name: "侧平举", sets: "4", reps: "15-20", targetWeight: "RPE 9", targetReps: "15", restTime: "60", notes: "控制下放速度，感受中束发力。" },
      { id: "f3", name: "二头弯举", sets: "3", reps: "12", targetWeight: "RPE 8", targetReps: "12", restTime: "60", notes: "大臂贴紧身体。" }
    ],
    coachNote: "打造盔甲般的肩部。动作要从容控制。"
  },
  6: { // Saturday
    dayName: "星期六",
    focus: "户外活动 (Outdoor)",
    theme: 'skill',
    exercises: [
      { id: "s1", name: "爬山/徒步", sets: "1", reps: "120分钟", targetWeight: "耐力", targetReps: "2h", notes: "亲近自然，提升心肺耐力。" }
    ],
    coachNote: "享受周末，保持身体活跃但不要过度疲劳。"
  },
  0: { // Sunday
    dayName: "星期日",
    focus: "系统维护 (Maintenance)",
    theme: 'rest',
    exercises: [
      { id: "su1", name: "本周复盘", sets: "1", reps: "10分钟", targetWeight: "脑力", targetReps: "10m", notes: "检查本周训练容量与身体反馈。" },
      { id: "su2", name: "饮食准备", sets: "1", reps: "30分钟", targetWeight: "生活", targetReps: "30m", notes: "准备下周的健康食材。" }
    ],
    coachNote: "为新的一周做好准备。"
  }
};