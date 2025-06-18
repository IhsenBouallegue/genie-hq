"use client";

import type { InstalledTool, ToolVersion } from "@/lib/mise-api";
import { useGenieStore } from "@/providers/genie-store-provider";
import { Badge } from "@geniehq/ui/components/badge";
import { Button } from "@geniehq/ui/components/button";
import { Input } from "@geniehq/ui/components/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@geniehq/ui/components/table";
import { Globe, Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface VersionsTabProps {
  selectedToolObj: InstalledTool | null;
  allVersions: ToolVersion[];
}

export function VersionsTab({ selectedToolObj, allVersions }: VersionsTabProps) {
  const isLoading = useGenieStore((state) => state.isLoading);
  const installToolVersion = useGenieStore((state) => state.installToolVersion);
  const setToolVersion = useGenieStore((state) => state.setToolVersion);
  const uninstallToolVersion = useGenieStore((state) => state.uninstallToolVersion);

  const [versionSearch, setVersionSearch] = useState("");
  const [sortBy, setSortBy] = useState<"version" | "status">("version");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Filter versions based on search
  const filteredVersions = allVersions.filter((v) =>
    v.version.toLowerCase().includes(versionSearch.toLowerCase()),
  );

  // Sorting
  const sortedVersions = [...filteredVersions].sort((a, b) => {
    if (sortBy === "version") {
      if (sortDir === "asc")
        return a.version.localeCompare(b.version, undefined, { numeric: true });
      return b.version.localeCompare(a.version, undefined, { numeric: true });
    }
    // status: active > installed > available
    const statusOrder = (v: ToolVersion) => {
      const isActive = selectedToolObj?.versions.some(
        (ver) => ver.version === v.version && ver.active,
      );
      const isInstalled = selectedToolObj?.versions.some(
        (ver) => ver.version === v.version && ver.installed,
      );
      if (isActive) return 0;
      if (isInstalled) return 1;
      return 2;
    };
    if (sortDir === "asc") return statusOrder(a) - statusOrder(b);
    return statusOrder(b) - statusOrder(a);
  });

  // Pagination
  const totalPages = Math.ceil(sortedVersions.length / pageSize);
  const paginatedVersions = sortedVersions.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <Input
          type="text"
          placeholder="Search versions..."
          value={versionSearch}
          onChange={(e) => {
            setVersionSearch(e.target.value);
            setPage(1);
          }}
          className="w-64"
        />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => {
                  if (sortBy === "version") setSortDir(sortDir === "asc" ? "desc" : "asc");
                  else {
                    setSortBy("version");
                    setSortDir("asc");
                  }
                }}
              >
                Version {sortBy === "version" ? (sortDir === "asc" ? "▲" : "▼") : ""}
              </TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => {
                  if (sortBy === "status") setSortDir(sortDir === "asc" ? "desc" : "asc");
                  else {
                    setSortBy("status");
                    setSortDir("asc");
                  }
                }}
              >
                Status {sortBy === "status" ? (sortDir === "asc" ? "▲" : "▼") : ""}
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedVersions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  No versions found
                </TableCell>
              </TableRow>
            ) : null}
            {paginatedVersions.map((version) => {
              const isActive = selectedToolObj?.versions.some(
                (v) => v.version === version.version && v.active,
              );
              const isInstalled = selectedToolObj?.versions.some(
                (v) => v.version === version.version && v.installed,
              );
              return (
                <TableRow key={version.version} className={isActive ? "bg-primary/10" : ""}>
                  <TableCell className="font-mono">{version.version}</TableCell>
                  <TableCell>
                    {isActive ? (
                      <Badge variant="default">Active</Badge>
                    ) : isInstalled ? (
                      <Badge variant="secondary">Installed</Badge>
                    ) : (
                      <Badge variant="outline">Available</Badge>
                    )}
                  </TableCell>
                  <TableCell className="flex gap-1">
                    {!isInstalled ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          installToolVersion(selectedToolObj?.name ?? "", version.version)
                        }
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Plus className="h-3 w-3" />
                        )}
                      </Button>
                    ) : null}
                    {isInstalled && !isActive ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setToolVersion(selectedToolObj?.name ?? "", version.version, true)
                        }
                        disabled={isLoading}
                      >
                        <Globe className="h-3 w-3" />
                      </Button>
                    ) : null}
                    {isInstalled ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          uninstallToolVersion(selectedToolObj?.name ?? "", version.version)
                        }
                        disabled={isLoading}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    ) : null}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Prev
                  </Button>
                  <span>
                    Page {page} of {totalPages || 1}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={page === totalPages || totalPages === 0}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
