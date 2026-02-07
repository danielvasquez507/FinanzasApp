import React from 'react';
import {
    CreditCard, Landmark, PiggyBank, Banknote, Coins, Receipt, Wallet,
    Home, Zap, Droplets, Wifi, Phone, Tv, Sofa, Bed, Bath,
    ShowerHead, Lightbulb, ShoppingCart, Shirt, Scissors, Gift, Package,
    Smartphone, Monitor, Plug, Coffee, Utensils, Clapperboard, Ticket, Gamepad2,
    Music, Flower2, Car, Fuel, Bus, Plane, Palmtree, Mountain, Tent,
    Heart, Stethoscope, Pill, Dumbbell, Baby, Dog, Cat, Briefcase,
    BookOpen, GraduationCap, Hammer, Wrench, MoreHorizontal, Trees,
    Camera, Watch, Headphones, Speaker, Tablet, Printer, Battery, Archive,
    Bookmark, Calendar, Cloud, Code, Compass, Database, Flag, Folder,
    Globe, Image as ImageIcon, Key, Link, Lock as LockIcon, Mail, Map as MapIcon, MapPin, MessageCircle,
    Mic, Mouse, Paperclip, Pen, Play, Power, Radio, Search, Send,
    Server, Shield, Star, Tag, Terminal, Truck, Umbrella, Video, Voicemail,
    User, UserCircle2, Users2, HeartHandshake, Accessibility, Sparkles, Syringe, Thermometer,
    HardHat, Shovel, Ruler, Paintbrush, ShieldCheck, UserCog, UserCheck
} from 'lucide-react';

export const ICON_LIB: Record<string, React.ReactNode> = {
    'credit-card': <CreditCard size={20} />, 'landmark': <Landmark size={20} />, 'piggy-bank': <PiggyBank size={20} />,
    'banknote': <Banknote size={20} />, 'coins': <Coins size={20} />, 'receipt': <Receipt size={20} />, 'wallet': <Wallet size={20} />,
    'home': <Home size={20} />, 'zap': <Zap size={20} />, 'droplets': <Droplets size={20} />, 'wifi': <Wifi size={20} />,
    'phone': <Phone size={20} />, 'tv': <Tv size={20} />, 'sofa': <Sofa size={20} />, 'bed': <Bed size={20} />, 'bath': <Bath size={20} />,
    'shower': <ShowerHead size={20} />, 'lightbulb': <Lightbulb size={20} />, 'shopping-cart': <ShoppingCart size={20} />,
    'shirt': <Shirt size={20} />, 'scissors': <Scissors size={20} />, 'gift': <Gift size={20} />, 'package': <Package size={20} />,
    'smartphone': <Smartphone size={20} />, 'monitor': <Monitor size={20} />, 'plug': <Plug size={20} />, 'coffee': <Coffee size={20} />,
    'utensils': <Utensils size={20} />, 'clapperboard': <Clapperboard size={20} />, 'ticket': <Ticket size={20} />, 'gamepad': <Gamepad2 size={20} />,
    'music': <Music size={20} />, 'flower': <Flower2 size={20} />, 'car': <Car size={20} />, 'fuel': <Fuel size={20} />, 'bus': <Bus size={20} />,
    'plane': <Plane size={20} />, 'palmtree': <Palmtree size={20} />, 'mountain': <Mountain size={20} />, 'tent': <Tent size={20} />,
    'heart': <Heart size={20} />, 'stethoscope': <Stethoscope size={20} />, 'pill': <Pill size={20} />, 'dumbbell': <Dumbbell size={20} />,
    'baby': <Baby size={20} />, 'dog': <Dog size={20} />, 'cat': <Cat size={20} />, 'briefcase': <Briefcase size={20} />,
    'book': <BookOpen size={20} />, 'grad': <GraduationCap size={20} />, 'hammer': <Hammer size={20} />, 'wrench': <Wrench size={20} />,
    'more': <MoreHorizontal size={20} />, 'trees': <Trees size={20} />,
    'camera': <Camera size={20} />, 'watch': <Watch size={20} />, 'headphones': <Headphones size={20} />, 'speaker': <Speaker size={20} />,
    'tablet': <Tablet size={20} />, 'printer': <Printer size={20} />, 'battery': <Battery size={20} />, 'archive': <Archive size={20} />,
    'bookmark': <Bookmark size={20} />, 'calendar': <Calendar size={20} />, 'cloud': <Cloud size={20} />, 'code': <Code size={20} />,
    'compass': <Compass size={20} />, 'database': <Database size={20} />, 'flag': <Flag size={20} />, 'folder': <Folder size={20} />,
    'globe': <Globe size={20} />, 'image': <ImageIcon size={20} />, 'key': <Key size={20} />, 'link': <Link size={20} />, 'lock': <LockIcon size={20} />,
    'mail': <Mail size={20} />, 'map': <MapIcon size={20} />, 'map-pin': <MapPin size={20} />, 'message': <MessageCircle size={20} />,
    'mic': <Mic size={20} />, 'mouse': <Mouse size={20} />, 'paperclip': <Paperclip size={20} />, 'pen': <Pen size={20} />,
    'play': <Play size={20} />, 'power': <Power size={20} />, 'radio': <Radio size={20} />, 'search': <Search size={20} />,
    'send': <Send size={20} />, 'server': <Server size={20} />, 'shield': <Shield size={20} />, 'star': <Star size={20} />,
    'tag': <Tag size={20} />, 'terminal': <Terminal size={20} />, 'truck': <Truck size={20} />,
    'umbrella': <Umbrella size={20} />, 'video': <Video size={20} />, 'voicemail': <Voicemail size={20} />,
    'user': <User size={20} />, 'lady': <UserCircle2 size={20} />, 'family': <Users2 size={20} />, 'handshake': <HeartHandshake size={20} />, 'accessibility': <Accessibility size={20} />,
    'services': <Sparkles size={20} />, 'syringe': <Syringe size={20} />, 'thermometer': <Thermometer size={20} />,
    'hardhat': <HardHat size={20} />, 'shovel': <Shovel size={20} />, 'ruler': <Ruler size={20} />, 'paintbrush': <Paintbrush size={20} />,
    'shield-check': <ShieldCheck size={20} />, 'user-cog': <UserCog size={20} />, 'user-check': <UserCheck size={20} />
};

export const COLORS_LIB = [
    'bg-blue-600 text-white', 'bg-blue-500 text-white', 'bg-blue-400 text-white',
    'bg-indigo-600 text-white', 'bg-indigo-500 text-white', 'bg-violet-600 text-white',
    'bg-purple-600 text-white', 'bg-purple-500 text-white', 'bg-fuchsia-600 text-white',
    'bg-pink-600 text-white', 'bg-rose-600 text-white', 'bg-rose-500 text-white',
    'bg-red-600 text-white', 'bg-red-500 text-white', 'bg-orange-600 text-white',
    'bg-orange-500 text-white', 'bg-amber-500 text-white', 'bg-yellow-500 text-white',
    'bg-lime-600 text-white', 'bg-green-600 text-white', 'bg-green-500 text-white',
    'bg-emerald-600 text-white', 'bg-teal-600 text-white', 'bg-teal-500 text-white',
    'bg-cyan-600 text-white', 'bg-sky-600 text-white', 'bg-slate-800 text-white',
    'bg-slate-600 text-white', 'bg-zinc-700 text-white', 'bg-stone-600 text-white',
    'bg-blue-100 text-blue-700', 'bg-green-100 text-green-700', 'bg-red-100 text-red-700',
    'bg-orange-100 text-orange-700', 'bg-purple-100 text-purple-700', 'bg-pink-100 text-pink-700',
    'bg-yellow-100 text-yellow-700', 'bg-slate-100 text-slate-700'
];

export const OWNERS = ['Daniel', 'Gedalya', 'Ambos'];
