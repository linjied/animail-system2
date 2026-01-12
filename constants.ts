
import { Pet } from './types';

export const MOCK_PETS: Pet[] = [
  {
    id: '1',
    name: '巴迪 (Buddy)',
    type: '狗狗',
    breed: '金毛寻回犬',
    age: '2岁',
    gender: '公',
    size: '大型',
    description: '巴迪是一只非常快乐的金毛，喜欢玩接球和游泳。它对小孩和其他狗狗非常友好。',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800',
    tags: ['活泼', '对小孩友好', '已接种疫苗'],
    health: '身体状况极佳，疫苗接种齐全。',
    personality: ['贪玩', '忠诚', '精力充沛']
  },
  {
    id: '2',
    name: '露娜 (Luna)',
    type: '猫咪',
    breed: '暹罗猫',
    age: '4岁',
    gender: '母',
    size: '小型',
    description: '露娜是一只优雅的暹罗猫，喜欢安静地坐在窗边晒太阳。它非常爱“说话”，喜欢和主人互动。',
    image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&q=80&w=800',
    tags: ['安静', '室内养育', '粘人'],
    health: '近期刚做过牙齿清洁，体重健康。',
    personality: ['爱叫', '爱撒娇', '独立']
  },
  {
    id: '3',
    name: '麦克斯 (Max)',
    type: '狗狗',
    breed: '比格犬',
    age: '6个月',
    gender: '公',
    size: '中型',
    description: '麦克斯是一只充满好奇心的小狗，嗅觉极其灵敏。它需要一位能够耐心训练它并提供充足运动的主人。',
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800',
    tags: ['幼犬', '需要训练', '好奇心强'],
    health: '幼犬疫苗接种中。',
    personality: ['好奇', '警觉', '调皮']
  },
  {
    id: '4',
    name: '奥利弗 (Oliver)',
    type: '猫咪',
    breed: '缅因猫',
    age: '5岁',
    gender: '公',
    size: '大型',
    description: '奥利弗是一个温柔的巨人。虽然体型很大，但它非常沉稳，喜欢长时间打盹。它美丽的厚长毛需要定期梳理。',
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=800',
    tags: ['温柔', '长毛猫', '佛系'],
    health: '非常健康，需定期梳毛以防打结。',
    personality: ['有耐心', '冷静', '友善']
  },
  {
    id: '5',
    name: '贝拉 (Bella)',
    type: '狗狗',
    breed: '法斗',
    age: '3岁',
    gender: '母',
    size: '小型',
    description: '贝拉是一只适应城市生活的狗狗，在公寓里生活非常惬意。它喜欢短途散步，更喜欢蜷缩在沙发上陪主人看电视。',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800',
    tags: ['公寓友好', '运动量低', '爱抱抱'],
    health: '呼吸顺畅（对比同品种），无已知过敏。',
    personality: ['倔强', '幽默', '贴心']
  },
  {
    id: '6',
    name: '可可 (Coco)',
    type: '其他',
    breed: '荷兰垂耳兔',
    age: '1岁',
    gender: '母',
    size: '小型',
    description: '可可是一只甜美的小兔子，最爱吃香菜。它受过如厕训练，非常亲人且合群。',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=800',
    tags: ['异宠', '安静', '社交达人'],
    health: '健康状况良好，已绝育。',
    personality: ['害羞', '好奇', '甜美']
  }
];
