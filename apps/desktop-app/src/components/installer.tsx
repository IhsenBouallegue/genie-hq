import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@geniehq/ui/components/accordion";
import { Card, CardContent } from "@geniehq/ui/components/card";

export default function Installer() {
  const genres = [
    {
      name: "Rock",
      albums: [
        { title: "Back in Black", artist: "AC/DC", cover: "/placeholder.svg?height=100&width=100" },
        {
          title: "Led Zeppelin IV",
          artist: "Led Zeppelin",
          cover: "/placeholder.svg?height=100&width=100",
        },
        { title: "Nevermind", artist: "Nirvana", cover: "/placeholder.svg?height=100&width=100" },
        {
          title: "The Dark Side of the Moon",
          artist: "Pink Floyd",
          cover: "/placeholder.svg?height=100&width=100",
        },
        {
          title: "Appetite for Destruction",
          artist: "Guns N' Roses",
          cover: "/placeholder.svg?height=100&width=100",
        },
      ],
    },
    {
      name: "Pop",
      albums: [
        {
          title: "Thriller",
          artist: "Michael Jackson",
          cover: "/placeholder.svg?height=100&width=100",
        },
        { title: "21", artist: "Adele", cover: "/placeholder.svg?height=100&width=100" },
        { title: "1989", artist: "Taylor Swift", cover: "/placeholder.svg?height=100&width=100" },
        {
          title: "Born This Way",
          artist: "Lady Gaga",
          cover: "/placeholder.svg?height=100&width=100",
        },
        {
          title: "Teenage Dream",
          artist: "Katy Perry",
          cover: "/placeholder.svg?height=100&width=100",
        },
      ],
    },
    {
      name: "Hip Hop",
      albums: [
        {
          title: "The Marshall Mathers LP",
          artist: "Eminem",
          cover: "/placeholder.svg?height=100&width=100",
        },
        {
          title: "To Pimp a Butterfly",
          artist: "Kendrick Lamar",
          cover: "/placeholder.svg?height=100&width=100",
        },
        { title: "The Blueprint", artist: "Jay-Z", cover: "/placeholder.svg?height=100&width=100" },
        { title: "The Chronic", artist: "Dr. Dre", cover: "/placeholder.svg?height=100&width=100" },
        { title: "Illmatic", artist: "Nas", cover: "/placeholder.svg?height=100&width=100" },
      ],
    },
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {genres.map((genre) => (
        <AccordionItem key={genre.name} value={`item-${genre.name}`}>
          <AccordionTrigger className="text-lg font-semibold">{genre.name}</AccordionTrigger>
          <AccordionContent>
            <div className="w-full max-w-full overflow-x-auto">
              <div className="flex space-x-4 p-4  max-w-full overflow-x-auto flex-wrap">
                {genre.albums.map((album) => (
                  <Card
                    key={album.artist}
                    className="w-[150px] flex-shrink-0 transition-transform duration-300 hover:scale-105"
                  >
                    <CardContent className="p-4">
                      {/** biome-ignore lint/performance/noImgElement: ig iss okay */}
                      <img
                        src={album.cover}
                        alt={`${album.title} cover`}
                        className="w-full h-[100px] object-cover rounded-md mb-2"
                      />
                      <h3 className="font-semibold text-sm truncate">{album.title}</h3>
                      <p className="text-xs text-muted-foreground truncate">{album.artist}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
