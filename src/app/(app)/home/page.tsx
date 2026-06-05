"use client";
import { useState } from "react";
import {
  Menu, Bell, MessageCircle, MoreHorizontal,
  Heart, MessageSquare, Send, Bookmark,
} from "lucide-react";
import clsx from "clsx";
import { news, timeAgo, type NewsItem } from "@/data/news";
import { NewsImage } from "@/components/NewsImage";
import { useToolsDrawer } from "@/components/AppShell";

export default function Home() {
  const { open } = useToolsDrawer();
  return (
    <div>
      <header className="px-4 py-4 flex items-center justify-between">
        <button aria-label="Abrir menu" onClick={open} className="w-[42px] h-[42px] rounded-full border-[1.5px] border-brand inline-flex items-center justify-center text-fg hover:bg-brand/10">
          <Menu size={20} />
        </button>
        <p className="text-2xl font-black tracking-widest">
          Agro<span className="text-brand">Net</span>
        </p>
        <div className="flex items-center gap-2">
          <CircleBtn aria-label="Notificações" badge><Bell size={20} /></CircleBtn>
          <CircleBtn aria-label="Conversas"><MessageCircle size={20} /></CircleBtn>
        </div>
      </header>

      <div className="divide-y divide-border">
        {news.map((n) => <Post key={n.id} item={n} />)}
      </div>
    </div>
  );
}

function CircleBtn({ children, badge, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { badge?: boolean }) {
  return (
    <button {...rest} className="relative w-[42px] h-[42px] rounded-full border-[1.5px] border-brand inline-flex items-center justify-center text-fg hover:bg-brand/10">
      {children}
      {badge && <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-down" />}
    </button>
  );
}

function Post({ item }: { item: NewsItem }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [following, setFollowing] = useState(false);
  const likeCount = item.likes + (liked ? 1 : 0);

  return (
    <article className="pb-4">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-11 h-11 rounded-full bg-card border border-border-strong inline-flex items-center justify-center text-brand">
          {item.source.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-extrabold text-sm tracking-wide truncate">{item.source.toUpperCase()}</p>
          <p className="text-fg-muted text-xs">Há {timeAgo(item.publishedAt)}</p>
        </div>
        <button aria-label="Mais opções" className="text-fg-muted hover:text-fg"><MoreHorizontal size={20} /></button>
        <button onClick={() => setFollowing((v) => !v)} className="text-brand font-bold ml-2">
          {following ? "✓ Seguindo" : "+ Seguir"}
        </button>
      </div>

      <div className="px-4 pb-3">
        <p className="leading-relaxed">
          <strong>{item.title}</strong><br /><br />{item.summary}
        </p>
        <button className="text-fg-muted text-sm font-semibold mt-2">ver mais</button>
      </div>

      <NewsImage src={item.image} accent={item.accent} Icon={item.icon} iconSize={56} alt={item.title} className="w-full aspect-[5/4]" />

      <div className="flex items-center gap-7 px-4 pt-4">
        <Action onClick={() => setLiked((v) => !v)} icon={<Heart size={22} className={clsx(liked ? "text-down fill-down" : "text-brand")} />} count={likeCount} />
        <Action icon={<MessageSquare size={20} className="text-brand" />} count={item.comments} />
        <Action icon={<Send size={20} className="text-brand" />} count={0} />
        <div className="flex-1" />
        <Action onClick={() => setSaved((v) => !v)} icon={<Bookmark size={20} className={clsx("text-brand", saved && "fill-brand")} />} count={Math.max(1, Math.floor(item.likes / 12))} />
      </div>

      <p className="text-fg-muted text-sm px-4 pt-3">
        Curtido por <strong className="text-fg font-bold">Felipe Vieira</strong> e outros
      </p>
    </article>
  );
}

function Action({ icon, count, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { icon: React.ReactNode; count: number }) {
  return (
    <button {...rest} className="inline-flex items-center gap-1.5 hover:opacity-70 active:scale-95 transition">
      {icon}
      <span className="text-fg font-semibold">{count}</span>
    </button>
  );
}
