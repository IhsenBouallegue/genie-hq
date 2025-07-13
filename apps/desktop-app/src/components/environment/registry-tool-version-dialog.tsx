"use client";

import { Badge } from "@geniehq/ui/components/badge";
import { Button } from "@geniehq/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@geniehq/ui/components/dialog";
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
import { Download, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { RegistryTool } from "@/lib/mise-api";
import { useGenieStore } from "@/providers/genie-store-provider";

interface RegistryToolVersionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tool: RegistryTool;
}

export function RegistryToolVersionDialog({
  open,
  onOpenChange,
  tool,
}: RegistryToolVersionDialogProps) {
  const isLoading = useGenieStore((state) => state.isLoading);
  const loadAvailableVersions = useGenieStore((state) => state.loadAvailableVersions);
  const installRegistryToolVersion = useGenieStore((state) => state.installRegistryToolVersion);
  const availableVersions = useGenieStore((state) => state.availableVersions[tool.name] || []);

  const [versionSearch, setVersionSearch] = useState("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Load available versions when dialog opens
  useEffect(() => {
    if (open && tool.name) {
      loadAvailableVersions(tool.name);
    }
  }, [open, tool.name, loadAvailableVersions]);

  // Filter versions based on search
  const filteredVersions = availableVersions.filter((v) =>
    v.version.toLowerCase().includes(versionSearch.toLowerCase()),
  );

  // Sort versions (latest first by default)
  const sortedVersions = [...filteredVersions].sort((a, b) => {
    if (sortDir === "desc") {
      return b.version.localeCompare(a.version, undefined, { numeric: true });
    }
    return a.version.localeCompare(b.version, undefined, { numeric: true });
  });

  // Pagination
  const totalPages = Math.ceil(sortedVersions.length / pageSize);
  const paginatedVersions = sortedVersions.slice((page - 1) * pageSize, page * pageSize);

  const handleInstallVersion = async (version: string) => {
    await installRegistryToolVersion(tool.name, version);
    onOpenChange(false);
  };

  const handleInstallLatest = async () => {
    if (sortedVersions.length > 0) {
      // Install the first version in the sorted list (latest)
      await installRegistryToolVersion(tool.name, sortedVersions[0]?.version || "");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Install {tool.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Quick Install Latest */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <h3 className="font-semibold">Quick Install</h3>
              <p className="text-sm text-muted-foreground">
                Install the latest version ({sortedVersions[0]?.version || "unknown"})
              </p>
            </div>
            <Button
              onClick={handleInstallLatest}
              disabled={isLoading || sortedVersions.length === 0}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              Install Latest
            </Button>
          </div>

          {/* Version Selection */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Choose Specific Version</h3>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Search versions..."
                  value={versionSearch}
                  onChange={(e) => {
                    setVersionSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-48"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
                >
                  {sortDir === "desc" ? "Latest First" : "Oldest First"}
                </Button>
              </div>
            </div>

            {availableVersions.length === 0 && !isLoading ? (
              <div className="text-center text-muted-foreground py-8">
                No versions available for this tool
              </div>
            ) : (
              <div className="overflow-x-auto border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Version</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-8">
                          <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                          Loading versions...
                        </TableCell>
                      </TableRow>
                    ) : paginatedVersions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                          No versions found
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedVersions.map((version) => (
                        <TableRow key={version.version}>
                          <TableCell className="font-mono">{version.version}</TableCell>
                          <TableCell>
                            <Badge variant="outline">Available</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleInstallVersion(version.version)}
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <Download className="h-3 w-3" />
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                  {totalPages > 1 && (
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
                            <span className="text-sm">
                              Page {page} of {totalPages}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={page === totalPages}
                              onClick={() => setPage(page + 1)}
                            >
                              Next
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  )}
                </Table>
              </div>
            )}
          </div>
        </div>

        <DialogClose asChild>
          <Button variant="outline" className="mt-6 w-full">
            Cancel
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
